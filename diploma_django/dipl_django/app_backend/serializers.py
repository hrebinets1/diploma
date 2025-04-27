from rest_framework import serializers
from .models import Section, QuestionReading, QuestionGrammar, QuestionListening, VocabularyData
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

class QuestionReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionReading
        fields = ['id', 'question', 'answers', 'correct', 'errorText']

class QuestionGrammarSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionGrammar
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
    password = serializers.CharField(write_only=True, required=True,
        error_messages={
            'required': "Ви не вказали пароль."
        }
    )
    username = serializers.CharField(required=True,
        error_messages={
            'required': "Ви не вказали ім'я."
        },
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="Це ім'я користувача вже зайнято."
            )
        ]
    )
    email = serializers.EmailField(required=True,
        error_messages={
            'required': "Email обязателен для заполнения."
        },
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="Цей email вже зареєстрований."
            )
        ]
    )

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email')
        )
        return user

class VocabularyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = VocabularyData
        fields = ['id', 'question', 'answers', 'correct', 'errorText']