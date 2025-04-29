from django.db import models

class Section(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField()
    choices = [
        ('vocabulary', 'Vocabulary'),
        ('reading', 'Reading'),
        ('listening', 'Listening'),
        ('grammar', 'Grammar'),
    ]
    category = models.CharField(max_length=20, choices=choices, default='vocabulary')

    public_test = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class QuestionReading(models.Model):
    section = models.ForeignKey(Section, related_name="questions_reading", on_delete=models.CASCADE)
    question = models.TextField()
    answers = models.JSONField()
    correct = models.CharField(max_length=255)
    errorText = models.TextField()
    number_points = models.IntegerField(default=1)

    def __str__(self):
        return self.question

class QuestionGrammar(models.Model):
    section = models.ForeignKey(Section, related_name="questions_grammar", on_delete=models.CASCADE)
    question = models.TextField()
    answers = models.JSONField()
    correct = models.CharField(max_length=255)
    errorText = models.TextField()
    number_points = models.IntegerField(default=1)

    def __str__(self):
        return self.question

class QuestionListening(models.Model):
    section = models.ForeignKey(Section, related_name="questions_listening", on_delete=models.CASCADE)
    videoSrc = models.URLField()
    question = models.TextField()
    answers = models.JSONField()
    correct = models.CharField(max_length=255)
    errorText = models.TextField()
    number_points = models.IntegerField(default=1)

    def __str__(self):
        return self.question


class VocabularyData(models.Model):
    section = models.ForeignKey(Section, related_name="vocabulary_data", on_delete=models.CASCADE)
    question = models.TextField()
    answers = models.JSONField()
    correct = models.CharField(max_length=255)
    errorText = models.TextField()
    number_points = models.IntegerField(default=1)

    def __str__(self):
        return self.question