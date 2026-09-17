from flask import Blueprint, jsonify, request
from ..extensions import db
from ..models import Course, Enrollment, User

enrollments_bp = Blueprint("enrollments", __name__)

@enrollments_bp.get("")
def list_enrollments():
    student_id = request.args.get("student_id", type=int)
    query = Enrollment.query
    if student_id:
        query = query.filter_by(student_id=student_id)
    return jsonify([{"id": item.id, "student_id": item.student_id, "course_id": item.course_id, "progress": item.progress, "status": item.status, "course": {"id": item.course.id, "title": item.course.title, "image": item.course.image} if item.course else None} for item in query.all()])

@enrollments_bp.post("")
def create_enrollment():
    data = request.get_json(silent=True) or {}
    student = db.get_or_404(User, data.get("student_id")); course = db.get_or_404(Course, data.get("course_id"))
    if Enrollment.query.filter_by(student_id=student.id, course_id=course.id).first():
        return jsonify({"message": "Student is already enrolled"}), 409
    enrollment = Enrollment(student_id=student.id, course_id=course.id); course.students_count = (course.students_count or 0) + 1; db.session.add(enrollment); db.session.commit()
    return jsonify({"id": enrollment.id, "student_id": student.id, "course_id": course.id, "progress": enrollment.progress, "status": enrollment.status}), 201

@enrollments_bp.patch("/<int:enrollment_id>")
def update_enrollment(enrollment_id):
    enrollment = db.get_or_404(Enrollment, enrollment_id); data = request.get_json(silent=True) or {}
    if "progress" in data:
        enrollment.progress = max(0, min(100, int(data["progress"]))); enrollment.status = "completed" if enrollment.progress == 100 else "in_progress"
    db.session.commit(); return jsonify({"id": enrollment.id, "progress": enrollment.progress, "status": enrollment.status})
