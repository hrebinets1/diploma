from django.contrib import admin
from .models import Section, QuestionGrammar, QuestionListening, QuestionReading, VocabularyData

admin.site.register(Section)
admin.site.register(QuestionGrammar)
admin.site.register(QuestionListening)
admin.site.register(QuestionReading)
admin.site.register(VocabularyData)
