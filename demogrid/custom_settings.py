"""
Template for secure parameters which have no place in source control
To deploy set the values and rename file to custom_settings.py
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'd--^e6_dah916&$#b0m8!nw=-c(^db2l^*oj(b-rvio!zpuouz'
DEBUG = True
ALLOWED_HOSTS = []
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Europe/Moscow'