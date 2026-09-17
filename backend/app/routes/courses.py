from flask import Blueprint, jsonify, request
from ..extensions import db
from ..models import Category, Course, Instructor, Lesson

courses_bp = Blueprint("courses", __name__)


def course_response(course):
    return {
        "id": course.id,
        "title": course.title,
        "description": course.description,
        "level": course.level,
        "price": float(course.price or 0),
        "duration": course.duration,
        "image": course.image,
        "rating": course.rating,
        "students_count": course.students_count,
        "instructor": {"id": course.instructor.id, "name": course.instructor.name} if course.instructor else None,
        "category": {"id": course.category.id, "name": course.category.name} if course.category else None,
        "lessons": [{"id": lesson.id, "title": lesson.title, "description": lesson.description, "video_url": lesson.video_url, "position": lesson.position} for lesson in sorted(course.lessons, key=lambda item: item.position)],
    }


def validate_course(data):
    required = ["title", "description"]
    missing = [field for field in required if not data.get(field)]
    if missing:
        return f"Required fields: {', '.join(missing)}"
    return None


@courses_bp.get("")
def list_courses():
    query = Course.query
    search = request.args.get("search", "").strip()
    category = request.args.get("category")
    level = request.args.get("level")
    if search:
        query = query.filter(Course.title.ilike(f"%{search}%"))
    if category:
        query = query.join(Category).filter(Category.name == category)
    if level:
        query = query.filter(Course.level == level)
    return jsonify([course_response(course) for course in query.order_by(Course.created_at.desc()).all()])


@courses_bp.get("/<int:course_id>")
def get_course(course_id):
    course = db.get_or_404(Course, course_id)
    return jsonify(course_response(course))


@courses_bp.post("")
def create_course():
    data = request.get_json(silent=True) or {}
    error = validate_course(data)
    if error:
        return jsonify({"message": error}), 400

    course = Course(title=data["title"].strip(), description=data["description"].strip(), level=data.get("level", "Beginner"), price=data.get("price", 0), duration=data.get("duration"), image=data.get("image"), instructor_id=data.get("instructor_id"), category_id=data.get("category_id"))
    db.session.add(course)
    for position, lesson in enumerate(data.get("lessons", []), start=1):
        course.lessons.append(Lesson(title=lesson.get("title", f"Lesson {position}"), description=lesson.get("description"), video_url=lesson.get("video_url"), position=position))
    db.session.commit()
    return jsonify(course_response(course)), 201


@courses_bp.put("/<int:course_id>")
def update_course(course_id):
    course = db.get_or_404(Course, course_id)
    data = request.get_json(silent=True) or {}
    error = validate_course(data)
    if error:
        return jsonify({"message": error}), 400
    for field in ["title", "description", "level", "price", "duration", "image", "instructor_id", "category_id"]:
        if field in data:
            setattr(course, field, data[field])
    db.session.commit()
    return jsonify(course_response(course))


@courses_bp.delete("/<int:course_id>")
def delete_course(course_id):
    course = db.get_or_404(Course, course_id)
    db.session.delete(course)
    db.session.commit()
    return jsonify({"message": "Course deleted successfully"})
