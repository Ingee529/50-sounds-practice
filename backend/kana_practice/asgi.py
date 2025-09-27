"""
ASGI config for kana_practice project.
"""
import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kana_practice.settings')

application = get_asgi_application()