from django.db import models

class Section(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    choices = [
        ('vocabulary', 'Vocabulary'), ('reading', 'Reading'),
        ('listening', 'Listening'), ('grammar', 'Grammar'),
    ]
    category = models.CharField(choices=choices, default='vocabulary')
    def __str__(self):
        return self.name

class Question(models.Model):
    section = models.ForeignKey(Section, related_name="questions", on_delete=models.CASCADE)
    question = models.TextField()
    answers = models.JSONField()
    correct = models.CharField(max_length=255)
    errorText = models.TextField()

    def __str__(self):
        return self.question

class QuestionListening(models.Model):
    section = models.ForeignKey(Section, related_name="questions_listening", on_delete=models.CASCADE)
    videoSrc = models.URLField()
    question = models.TextField()
    answers = models.JSONField()
    correct = models.CharField(max_length=255)
    errorText = models.TextField()

    def __str__(self):
        return self.question