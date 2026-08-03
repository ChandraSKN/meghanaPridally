#!/bin/sh
set -e

python manage.py migrate --noinput

exec gunicorn core.wsgi:application --bind 0.0.0.0:${PORT:-8000}
