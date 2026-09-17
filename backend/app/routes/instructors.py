from flask import Blueprint, jsonify, request
from ..auth_utils import admin_required
from ..models import Instructor
from ..extensions import db

instructors_bp = Blueprint("instructors", __name__)


def instructor_response(instructor):
    return {
        "id": instructor.id,
        "name": instructor.name,
        "email": instructor.email,
        "specialization": instructor.specialization,
        "rating": instructor.rating,
        "courses_count": len(instructor.courses),
    }


@instructors_bp.get("")
def list_instructors():
    instructors = Instructor.query.order_by(Instructor.name).all()
    return jsonify([instructor_response(instructor) for instructor in instructors])


@instructors_bp.post("")
@admin_required
def create_instructor():
    data = request.get_json(silent=True) or {}
    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip().lower()
    specialization = str(data.get("specialization", "")).strip() or None

    if not name or not email:
        return jsonify({"message": "Name and email are required"}), 400
    if Instructor.query.filter_by(email=email).first():
        return jsonify({"message": "An instructor with this email already exists"}), 409

    try:
        rating = float(data.get("rating", 0) or 0)
    except (TypeError, ValueError):
        return jsonify({"message": "Rating must be a number"}), 400
    if rating < 0 or rating > 5:
        return jsonify({"message": "Rating must be between 0 and 5"}), 400

    instructor = Instructor(name=name, email=email, specialization=specialization, rating=rating)
    db.session.add(instructor)
    db.session.commit()
    return jsonify({"instructor": instructor_response(instructor), "message": "Instructor created successfully"}), 201


@instructors_bp.patch("/<int:instructor_id>")
@admin_required
def update_instructor(instructor_id):
    instructor = db.session.get(Instructor, instructor_id)
    if instructor is None:
        return jsonify({"message": "Instructor not found"}), 404

    data = request.get_json(silent=True) or {}
    if "name" in data:
        name = str(data["name"]).strip()
        if not name:
            return jsonify({"message": "Name is required"}), 400
        instructor.name = name
    if "email" in data:
        email = str(data["email"]).strip().lower()
        if not email:
            return jsonify({"message": "Email is required"}), 400
        duplicate = Instructor.query.filter(
            Instructor.email == email, Instructor.id != instructor_id
        ).first()
        if duplicate:
            return jsonify({"message": "An instructor with this email already exists"}), 409
        instructor.email = email
    if "specialization" in data:
        instructor.specialization = str(data["specialization"]).strip() or None
    if "rating" in data:
        try:
            rating = float(data["rating"])
        except (TypeError, ValueError):
            return jsonify({"message": "Rating must be a number"}), 400
        if rating < 0 or rating > 5:
            return jsonify({"message": "Rating must be between 0 and 5"}), 400
        instructor.rating = rating

    db.session.commit()
    return jsonify({"instructor": instructor_response(instructor), "message": "Instructor updated successfully"})


@instructors_bp.delete("/<int:instructor_id>")
@admin_required
def delete_instructor(instructor_id):
    instructor = db.session.get(Instructor, instructor_id)
    if instructor is None:
        return jsonify({"message": "Instructor not found"}), 404

    for course in instructor.courses:
        course.instructor_id = None
    db.session.delete(instructor)
    db.session.commit()
    return jsonify({"message": "Instructor deleted successfully"})
