from flask import Blueprint, jsonify
from ..models import Instructor

instructors_bp = Blueprint("instructors", __name__)


@instructors_bp.get("")
def list_instructors():
    instructors = Instructor.query.order_by(Instructor.name).all()
    return jsonify([{
        "id": instructor.id,
        "name": instructor.name,
        "email": instructor.email,
        "specialization": instructor.specialization,
        "rating": instructor.rating,
        "courses_count": len(instructor.courses),
    } for instructor in instructors])
