from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import db, migrate
from . import models
from .routes.health import health_bp
from .routes.auth import auth_bp
from .routes.courses import courses_bp
from .routes.categories import categories_bp
from .routes.instructors import instructors_bp
from .routes.enrollments import enrollments_bp


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app, origins=app.config["FRONTEND_URL"])

    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(courses_bp, url_prefix="/api/courses")
    app.register_blueprint(categories_bp, url_prefix="/api/categories")
    app.register_blueprint(instructors_bp, url_prefix="/api/instructors")
    app.register_blueprint(enrollments_bp, url_prefix="/api/enrollments")

    return app
