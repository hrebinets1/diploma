import os
import django

# Убедись, что это действительно 'dipl_django.settings', как в твоём проекте
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dipl_django.settings')
django.setup()

from app_backend.models import Section, Question

# Пример данных для загрузки
data = {
    "section": "Vocabulary",
    "description": "Choose the correct synonym.",
    "questions": [
        {
            "question": "Select the synonym for 'happy'",
            "options": ["sad", "joyful", "angry", "tired"],
            "correct_answer": "joyful",
            "explanation": "‘Joyful’ means the same as ‘happy’."
        },
        {
            "question": "Select the synonym for 'fast'",
            "options": ["slow", "quick", "lazy", "quiet"],
            "correct_answer": "quick",
            "explanation": "‘Quick’ is a synonym of ‘fast’."
        }
    ]
}

section = Section.objects.create(name=data["section"], description=data["description"])

for q in data["questions"]:
    Question.objects.create(
        section=section,
        text=q["question"],
        options=q["options"],
        correct_answer=q["correct_answer"],
        explanation=q["explanation"]
    )

print("Data loaded.")
