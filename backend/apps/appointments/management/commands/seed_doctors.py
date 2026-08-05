from django.core.management.base import BaseCommand
from apps.appointments.models import Doctor

DOCTORS = [
    {
        'name': 'Sarah Johnson',
        'email': 'sarah.johnson@pridally-doctors.example',
        'phone': '+44 20 7000 0001',
        'speciality': 'general_practice',
        'bio': 'General practitioner focused on preventive care and everyday health concerns.',
        'hospital': 'Pridally Community Clinic',
    },
    {
        'name': 'Michael Chen',
        'email': 'michael.chen@pridally-doctors.example',
        'phone': '+44 20 7000 0002',
        'speciality': 'psychiatry',
        'bio': 'Psychiatrist specialising in stress, anxiety, and mood-related concerns.',
        'hospital': 'Pridally Community Clinic',
    },
    {
        'name': 'Emily Rodriguez',
        'email': 'emily.rodriguez@pridally-doctors.example',
        'phone': '+44 20 7000 0003',
        'speciality': 'cardiology',
        'bio': 'Cardiologist with a focus on lifestyle-related heart health.',
        'hospital': 'Pridally Community Clinic',
    },
    {
        'name': 'James Park',
        'email': 'james.park@pridally-doctors.example',
        'phone': '+44 20 7000 0004',
        'speciality': 'dermatology',
        'bio': 'Dermatologist covering general skin health and common conditions.',
        'hospital': 'Pridally Community Clinic',
    },
    {
        'name': 'Olivia Bennett',
        'email': 'olivia.bennett@pridally-doctors.example',
        'phone': '+44 20 7000 0005',
        'speciality': 'neurology',
        'bio': 'Neurologist covering headaches, sleep, and nervous system concerns.',
        'hospital': 'Pridally Community Clinic',
    },
    {
        'name': 'Marcus Lee',
        'email': 'marcus.lee@pridally-doctors.example',
        'phone': '+44 20 7000 0006',
        'speciality': 'orthopedics',
        'bio': 'Orthopedic specialist for joint, muscle, and mobility concerns.',
        'hospital': 'Pridally Community Clinic',
    },
    {
        'name': 'Priya Nair',
        'email': 'priya.nair@pridally-doctors.example',
        'phone': '+44 20 7000 0007',
        'speciality': 'nutrition',
        'bio': 'Dietitian supporting sustainable, individualised nutrition plans.',
        'hospital': 'Pridally Community Clinic',
    },
    {
        'name': 'Daniel Kim',
        'email': 'daniel.kim@pridally-doctors.example',
        'phone': '+44 20 7000 0008',
        'speciality': 'physical_therapy',
        'bio': 'Physical therapist focused on recovery, mobility, and injury prevention.',
        'hospital': 'Pridally Community Clinic',
    },
]


class Command(BaseCommand):
    help = 'Seeds a starter roster of doctors, one per specialty, so the appointments feature has something to book against. Idempotent — safe to re-run.'

    def handle(self, *args, **options):
        created_count = 0
        for entry in DOCTORS:
            _, created = Doctor.objects.get_or_create(email=entry['email'], defaults=entry)
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f"Created Dr. {entry['name']} ({entry['speciality']})"))
            else:
                self.stdout.write(f"Already exists: Dr. {entry['name']} ({entry['speciality']})")

        self.stdout.write(self.style.SUCCESS(f'Done. {created_count} doctor(s) created, {len(DOCTORS) - created_count} already existed.'))
