from flask import Blueprint, jsonify, request
from ..extensions import db
from ..models import Category

categories_bp = Blueprint("categories", __name__)


def category_response(category):
    return {"id": category.id, "name": category.name, "description": category.description, "course_count": len(category.courses)}


@categories_bp.get("")
def list_categories():
    return jsonify([category_response(category) for category in Category.query.order_by(Category.name).all()])


@categories_bp.post("")
def create_category():
    data = request.get_json(silent=True) or {}
    name = data.get("name", "").strip()
    if not name:
        return jsonify({"message": "Category name is required"}), 400
    if Category.query.filter_by(name=name).first():
        return jsonify({"message": "Category already exists"}), 409
    category = Category(name=name, description=data.get("description"))
    db.session.add(category)
    db.session.commit()
    return jsonify(category_response(category)), 201


@categories_bp.patch("/<int:category_id>")
def update_category(category_id):
    category = db.get_or_404(Category, category_id)
    data = request.get_json(silent=True) or {}
    if data.get("name"):
        category.name = data["name"].strip()
    if "description" in data:
        category.description = data["description"]
    db.session.commit()
    return jsonify(category_response(category))


@categories_bp.delete("/<int:category_id>")
def delete_category(category_id):
    category = db.get_or_404(Category, category_id)
    db.session.delete(category)
    db.session.commit()
    return jsonify({"message": "Category deleted successfully"})
