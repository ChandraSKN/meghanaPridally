#!/bin/sh
set -e

python manage.py migrate --noinput
python manage.py seed_doctors

exec gunicorn core.wsgi:application --bind 0.0.0.0:${PORT:-8000}
