from django.contrib import admin
from .models import Section, Question, QuestionListening

admin.site.register(Section)
admin.site.register(Question)
admin.site.register(QuestionListening)
