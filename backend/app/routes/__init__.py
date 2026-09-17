from .health import health_bp
from .auth import auth_bp
from .courses import courses_bp
from .categories import categories_bp
from .instructors import instructors_bp
from .enrollments import enrollments_bp

__all__ = ["health_bp", "auth_bp", "courses_bp", "categories_bp", "instructors_bp", "enrollments_bp"]
