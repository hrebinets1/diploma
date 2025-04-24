from rest_framework import serializers
from .models import Section, Question, QuestionListening

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = ['id', 'name', 'description', 'category', 'questions']

class QuestionListeningSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionListening
        fields = '__all__'
