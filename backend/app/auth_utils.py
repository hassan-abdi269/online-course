from functools import wraps

from flask import jsonify, session


def current_user_id():
    return session.get("user_id")


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not current_user_id():
            return jsonify({"message": "Authentication required"}), 401
        return view(*args, **kwargs)

    return wrapped


def admin_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not current_user_id():
            return jsonify({"message": "Authentication required"}), 401
        if session.get("role") != "admin":
            return jsonify({"message": "Administrator access required"}), 403
        return view(*args, **kwargs)

    return wrapped
