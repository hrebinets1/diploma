from django.db import models

class Test(models.Model):
    title = models.CharField(max_length=255)  # Название теста
    description = models.TextField()  # Суть теста

    def __str__(self):
        return self.title

class Question(models.Model):
    test = models.ForeignKey(Test, related_name='questions', on_delete=models.CASCADE)  # Связь с тестом
    text = models.TextField()  # Текст вопроса

    def __str__(self):
        return self.text

class AnswerOption(models.Model):
    question = models.ForeignKey(Question, related_name='options', on_delete=models.CASCADE)  # Связь с вопросом
    text = models.CharField(max_length=255)  # Текст ответа
    is_correct = models.BooleanField(default=False)  # Правильный ли ответ
    number = models.PositiveIntegerField()  # Номер правильного ответа (например, 1, 2, 3 и т.д.)

    def __str__(self):
        return self.text

class ErrorMessage(models.Model):
    question = models.ForeignKey(Question, related_name='error_messages', on_delete=models.CASCADE)  # Связь с вопросом
    message = models.TextField()  # Сообщение, которое будет выводиться в случае ошибки

    def __str__(self):
        return f"Error message for question: {self.question.text}"
