from flask import Blueprint, jsonify, request
from ..auth_utils import current_user_id, login_required
from ..extensions import db
from ..models import Course, Enrollment, User

enrollments_bp = Blueprint("enrollments", __name__)

def response(item):
    return {"id": item.id, "student_id": item.student_id, "course_id": item.course_id, "progress": item.progress, "status": item.status, "course": {"id": item.course.id, "title": item.course.title, "image": item.course.image} if item.course else None}

@enrollments_bp.get("")
@login_required
def list_enrollments():
    query = Enrollment.query.filter_by(student_id=current_user_id())
    return jsonify([response(item) for item in query.all()])

@enrollments_bp.post("")
@login_required
def create_enrollment():
    data = request.get_json(silent=True) or {}
    course = db.get_or_404(Course, data.get("course_id"))
    student = db.get_or_404(User, current_user_id())
    if Enrollment.query.filter_by(student_id=student.id, course_id=course.id).first(): return jsonify({"message": "Student is already enrolled"}), 409
    enrollment = Enrollment(student_id=student.id, course_id=course.id); course.students_count = (course.students_count or 0) + 1; db.session.add(enrollment); db.session.commit()
    return jsonify(response(enrollment)), 201

@enrollments_bp.patch("/<int:enrollment_id>")
@login_required
def update_enrollment(enrollment_id):
    enrollment = db.get_or_404(Enrollment, enrollment_id)
    if enrollment.student_id != current_user_id(): return jsonify({"message": "You can only update your own enrollment"}), 403
    data = request.get_json(silent=True) or {}
    if "progress" in data:
        enrollment.progress = max(0, min(100, int(data["progress"]))); enrollment.status = "completed" if enrollment.progress == 100 else "in_progress"
    db.session.commit(); return jsonify(response(enrollment))
