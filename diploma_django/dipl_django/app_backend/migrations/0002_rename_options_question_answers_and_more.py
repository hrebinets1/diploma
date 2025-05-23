# Generated by Django 5.2 on 2025-04-24 07:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_backend', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='question',
            old_name='options',
            new_name='answers',
        ),
        migrations.RenameField(
            model_name='question',
            old_name='correct_answer',
            new_name='correct',
        ),
        migrations.RenameField(
            model_name='question',
            old_name='explanation',
            new_name='errorText',
        ),
        migrations.RenameField(
            model_name='question',
            old_name='text',
            new_name='preview',
        ),
        migrations.AddField(
            model_name='question',
            name='question',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='question',
            name='title',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='QuestionListening',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('preview', models.TextField()),
                ('videoSrc', models.URLField()),
                ('question', models.TextField()),
                ('answers', models.JSONField()),
                ('correct', models.CharField(max_length=255)),
                ('errorText', models.TextField()),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions_listening', to='app_backend.section')),
            ],
        ),
    ]
