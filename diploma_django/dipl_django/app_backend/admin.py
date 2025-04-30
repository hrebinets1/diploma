from django.contrib import admin
#from .models import Section, QuestionGrammar, QuestionListening, QuestionReading, VocabularyData, Times
from .models import *

admin.site.register(Section)
admin.site.register(QuestionGrammar)
admin.site.register(QuestionListening)
admin.site.register(QuestionReading)
admin.site.register(VocabularyData)
admin.site.register(Times)
admin.site.register(PresentTime)
admin.site.register(FutureTime)
admin.site.register(PastTime)
