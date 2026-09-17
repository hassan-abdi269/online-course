from datetime import datetime

from flask import Blueprint, jsonify, request

from ..auth_utils import admin_required
from ..extensions import db
from ..models import Course, Enrollment, Instructor, User

admin_bp = Blueprint("admin", __name__)


def enrollment_response(item):
    return {
        "id": item.id,
        "student_id": item.student_id,
        "student_name": item.student.name if item.student else None,
        "course_id": item.course_id,
        "course_title": item.course.title if item.course else None,
        "course_price": float(item.course.price or 0) if item.course else 0,
        "status": item.status,
        "progress": item.progress,
        "payment_method": item.payment_method,
        "reference_number": item.reference_number,
        "payment_evidence": item.payment_evidence,
        "created_at": item.created_at.isoformat() if item.created_at else None,
        "approved_at": item.approved_at.isoformat() if item.approved_at else None,
    }


@admin_bp.get("/stats")
@admin_required
def stats():
    return jsonify({
        "students": User.query.filter_by(role="student").count(),
        "courses": Course.query.count(),
        "instructors": Instructor.query.count(),
        "enrollments": Enrollment.query.count(),
    })


@admin_bp.get("/students")
@admin_required
def students():
    return jsonify([
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "created_at": user.created_at.isoformat() if user.created_at else None,
            "enrollments_count": len(user.enrollments),
        }
        for user in User.query.filter_by(role="student").order_by(User.created_at.desc()).all()
    ])


@admin_bp.get("/enrollments")
@admin_required
def enrollments():
    rows = Enrollment.query.order_by(Enrollment.created_at.desc()).all()
    return jsonify([enrollment_response(item) for item in rows])


@admin_bp.patch("/enrollments/<int:enrollment_id>")
@admin_required
def update_enrollment_status(enrollment_id):
    enrollment = db.get_or_404(Enrollment, enrollment_id)
    data = request.get_json(silent=True) or {}
    new_status = data.get("status")

    if new_status not in {"approved", "rejected", "pending"}:
        return jsonify({"message": "Invalid status"}), 400

    enrollment.status = new_status
    if new_status == "approved":
        enrollment.approved_at = datetime.utcnow()
    elif new_status == "rejected":
        enrollment.approved_at = None

    db.session.commit()
    return jsonify(enrollment_response(enrollment))
