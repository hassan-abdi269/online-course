from flask import Blueprint, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash
from ..auth_utils import current_user_id
from ..extensions import db
from ..models import User

auth_bp = Blueprint("auth", __name__)


def user_response(user):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "profile_image": user.profile_image,
        "phone": user.phone,
        "bio": user.bio,
    }


def establish_session(user):
    session.clear()
    session.permanent = True
    session["user_id"] = user.id
    session["role"] = user.role


@auth_bp.post("/register")
def register():
    data = request.get_json(silent=True) or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    if not name or not email or not password:
        return jsonify({"message": "Name, email, and password are required"}), 400
    if len(password) < 6:
        return jsonify({"message": "Password must contain at least 6 characters"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "An account with this email already exists"}), 409
    user = User(name=name, email=email, password_hash=generate_password_hash(password))
    db.session.add(user)
    db.session.commit()
    establish_session(user)
    return jsonify({"user": user_response(user), "message": "Registration successful"}), 201


@auth_bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    email = data.get("email", "").strip().lower()
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, data.get("password", "")):
        return jsonify({"message": "Invalid email or password"}), 401
    establish_session(user)
    return jsonify({"user": user_response(user), "message": "Login successful"})


@auth_bp.post("/logout")
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"})


@auth_bp.get("/me")
def me():
    user_id = current_user_id()
    user = db.session.get(User, user_id) if user_id else None
    if not user:
        session.clear()
        return jsonify({"user": None}), 401
    return jsonify({"user": user_response(user)})
