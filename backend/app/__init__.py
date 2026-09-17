from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import db, migrate
from .routes.health import health_bp


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app, origins=app.config["FRONTEND_URL"])

    app.register_blueprint(health_bp, url_prefix="/api")

    return app
