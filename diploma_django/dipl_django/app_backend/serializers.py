from rest_framework import serializers
from .models import Section, Question, QuestionListening
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
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

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,required=True,
        error_messages={
            'required': "Ви не вказали пароль."  # Кастомное сообщение для поля пароля
        }
    )
    username = serializers.CharField(required=True,
        error_messages={
            'required': "Ви не вказали ім'я." # Кастомное сообщение для поля username
        },
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message= "Це ім'я користувача вже зайнято."  # Кастомное сообщение для уникальности username
            )
        ]
    )
    email = serializers.EmailField(required=True,
        error_messages={
            'required': "Email обязателен для заполнения."  # Кастомное сообщение для поля email
        },
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="Цей email вже зареєстрований."  # Кастомное сообщение для уникальности email
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
