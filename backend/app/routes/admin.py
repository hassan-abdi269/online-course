from flask import Blueprint, jsonify
from ..auth_utils import admin_required
from ..models import Course, Enrollment, Instructor, User

admin_bp = Blueprint("admin", __name__)


@admin_bp.get("/stats")
@admin_required
def stats():
    return jsonify({"students": User.query.filter_by(role="student").count(), "courses": Course.query.count(), "instructors": Instructor.query.count(), "enrollments": Enrollment.query.count()})


@admin_bp.get("/students")
@admin_required
def students():
    return jsonify([{"id": user.id, "name": user.name, "email": user.email, "role": user.role, "created_at": user.created_at.isoformat() if user.created_at else None, "enrollments_count": len(user.enrollments)} for user in User.query.filter_by(role="student").order_by(User.created_at.desc()).all()])
