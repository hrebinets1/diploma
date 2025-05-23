from rest_framework import serializers
#from .models import Section, Times, QuestionReading, QuestionGrammar, QuestionListening, VocabularyData
from .models import *
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

class QuestionReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionReading
        fields = ['id', 'question', 'answers', 'correct', 'errorText', 'number_points']

class QuestionGrammarSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionGrammar
        fields = ['id', 'question', 'answers', 'correct', 'errorText', 'number_points']

class QuestionListeningSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionListening
        fields = ['id', 'videoSrc', 'question', 'answers', 'correct', 'errorText', 'number_points']

class SectionSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()

    class Meta:
        model = Section
        fields = ['id', 'name', 'public_test', 'image', 'description', 'category', 'questions']

    def get_questions(self, obj):
        if obj.category == 'listening':
            qs = obj.questions_listening.all()
            return QuestionListeningSerializer(qs, many=True).data
        elif obj.category == 'reading':
            qs = obj.questions_reading.all()
            return QuestionReadingSerializer(qs, many=True).data
        elif obj.category == 'grammar':
            qs = obj.questions_grammar.all()
            return QuestionGrammarSerializer(qs, many=True).data
        elif obj.category == 'vocabulary':
            qs = obj.vocabulary_data.all()
            return VocabularyDataSerializer(qs, many=True).data

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    username = serializers.CharField(required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(), message="Даний нікнейм вже зайнято."
            )
        ]
    )
    email = serializers.EmailField(required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(), message="Цей email вже зареєстрований."
            )
        ]
    )

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name')
        )
        return user

class VocabularyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = VocabularyData
        fields = ['id', 'question', 'answers', 'correct', 'errorText']

class PresentTimesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PresentTime
        fields = '__all__'


class PastTimesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PastTime
        fields = '__all__'


class FutureTimesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FutureTime
        fields = '__all__'
