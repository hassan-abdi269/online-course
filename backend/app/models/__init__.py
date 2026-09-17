from datetime import datetime
from ..extensions import db


class TimestampMixin:
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


class User(TimestampMixin, db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default="student", nullable=False)
    profile_image = db.Column(db.String(500))
    phone = db.Column(db.String(40))
    bio = db.Column(db.Text)
    enrollments = db.relationship("Enrollment", back_populates="student", cascade="all, delete-orphan")


class Instructor(TimestampMixin, db.Model):
    __tablename__ = "instructors"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    specialization = db.Column(db.String(160))
    rating = db.Column(db.Float, default=0)
    courses = db.relationship("Course", back_populates="instructor")


class Category(TimestampMixin, db.Model):
    __tablename__ = "categories"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text)
    courses = db.relationship("Course", back_populates="category")


class Course(TimestampMixin, db.Model):
    __tablename__ = "courses"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    level = db.Column(db.String(40), default="Beginner", nullable=False)
    price = db.Column(db.Numeric(10, 2), default=0, nullable=False)
    duration = db.Column(db.String(80))
    image = db.Column(db.String(500))
    rating = db.Column(db.Float, default=0)
    students_count = db.Column(db.Integer, default=0)
    instructor_id = db.Column(db.Integer, db.ForeignKey("instructors.id"))
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"))
    instructor = db.relationship("Instructor", back_populates="courses")
    category = db.relationship("Category", back_populates="courses")
    enrollments = db.relationship("Enrollment", back_populates="course", cascade="all, delete-orphan")
    lessons = db.relationship("Lesson", back_populates="course", cascade="all, delete-orphan")


class Lesson(TimestampMixin, db.Model):
    __tablename__ = "lessons"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    video_url = db.Column(db.String(500))
    position = db.Column(db.Integer, default=1, nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"), nullable=False)
    course = db.relationship("Course", back_populates="lessons")


class Enrollment(TimestampMixin, db.Model):
    __tablename__ = "enrollments"
    id = db.Column(db.Integer, primary_key=True)
    progress = db.Column(db.Integer, default=0, nullable=False)
    status = db.Column(db.String(30), default="pending", nullable=False)
    payment_method = db.Column(db.String(50), nullable=True)
    reference_number = db.Column(db.String(100), nullable=True)
    payment_evidence = db.Column(db.String(255), nullable=True)
    approved_at = db.Column(db.DateTime, nullable=True)
    student_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"), nullable=False)
    student = db.relationship("User", back_populates="enrollments")
    course = db.relationship("Course", back_populates="enrollments")
    __table_args__ = (db.UniqueConstraint("student_id", "course_id", name="unique_student_course"),)
