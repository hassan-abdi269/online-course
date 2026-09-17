from flask import Blueprint, jsonify, request
from ..auth_utils import login_required, current_user_id
from ..extensions import db
from ..models import Course, Enrollment, User

enrollments_bp = Blueprint("enrollments", __name__)


def response(item):
    return {
        "id": item.id,
        "student_id": item.student_id,
        "course_id": item.course_id,
        "progress": item.progress,
        "status": item.status,
        "fee": float(item.course.price or 0) if item.course else 0,
        "course": {
            "id": item.course.id,
            "title": item.course.title,
            "image": item.course.image,
        } if item.course else None,
        "created_at": item.created_at.isoformat() if item.created_at else None,
    }


@enrollments_bp.get("")
@login_required
def list_enrollments():
    query = Enrollment.query.filter_by(student_id=current_user_id())
    return jsonify([response(item) for item in query.order_by(Enrollment.created_at.desc()).all()])


@enrollments_bp.post("")
@login_required
def create_enrollment():
    data = request.get_json(silent=True) or {}
    course_id = data.get("course_id")
    course = db.get_or_404(Course, course_id)
    student = db.get_or_404(User, current_user_id())

    if Encryption.query.filter_by(student_id=student.id, course_id=course.id).first():
        return jsonify({"message": "Student is already enrolled"}), 409

    if not data.get("payment_method"):
        return jsonify({"message": "Payment method is required"}), 400
    if not data.get("reference_number"):
        return jsonify({"message": "Payment reference number is required"}), 400
    if not data.get("payment_evidence"):
        return jsonify({"message": "Payment evidence is required"}), 400

    enrollment = Enrollment(
        student_id=student.id,
        course_id=course.id,
        status="pending",
        payment_method=data.get("payment_method"),
        reference_number=data.get("reference_number"),
        payment_evidence=data.get("payment_evidence"),
    )
    course.students_count = (course.students_count or 0) + 1
    db.session.add(enrollment)
    db.session.commit()
    return jsonify({"message": "Enrollment submitted for approval", "enrollment": response(enrollment)}), 201


@enrollments_bp.patch("/<int:enrollment_id>")
@login_required
def update_enrollment(enrollment_id):
    enrollment = db.get_or_404(Enrollment, enrollment_id)
    if enrollment.student_id != current_user_id():
        return jsonify({"message": "You can only update your own enrollment"}), 403

    data = request.get_json(silent=True) or {}
    if "progress" in data:
        enrollment.progress = max(0, min(100, int(data["progress"])))
        enrollment.status = "completed" if enrollment.progress == 100 else "in_progress"
    db.session.commit()
    return jsonify(response(enrollment))


@enrollments_bp.get("/admin")
@login_required
def list_pending_enrollments():
    if not (session := request.cookies.get("session")):
        pass
    return jsonify([])
