# models.py
from django.db import models

class Quiz(models.Model):
    title = models.CharField(max_length=255)
    preview = models.TextField()
    image = models.URLField()  

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    text = models.TextField()
    correct = models.IntegerField()

class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
