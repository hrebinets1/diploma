from rest_framework import serializers
from .models import Section, Question, QuestionListening

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'question', 'answers', 'correct', 'errorText']

class QuestionListeningSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionListening
        fields = ['id', 'videoSrc', 'question', 'answers', 'correct', 'errorText']

class SectionSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()

    class Meta:
        model = Section
        fields = ['id', 'name', 'description', 'category', 'questions']

    def get_questions(self, obj):
        if obj.category == 'listening':
            qs = obj.questions_listening.all()
            return QuestionListeningSerializer(qs, many=True).data
        else:
            qs = obj.questions.all()
            return QuestionSerializer(qs, many=True).data
