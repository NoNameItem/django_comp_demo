"""
Template for secure parameters which have no place in source control, like sensitive or installation-specific settings
To deploy set the values and rename file to custom_settings.py
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = None
DEBUG = None
ALLOWED_HOSTS = None
DATABASES = {}
LANGUAGE_CODE = None
TIME_ZONE = None
