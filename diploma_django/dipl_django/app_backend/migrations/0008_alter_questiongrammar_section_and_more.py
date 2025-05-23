# Generated by Django 4.2.6 on 2025-04-27 15:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_backend', '0007_rename_question_questiongrammar_questionreading'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questiongrammar',
            name='section',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions_grammar', to='app_backend.section'),
        ),
        migrations.AlterField(
            model_name='questionreading',
            name='section',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions_reading', to='app_backend.section'),
        ),
        migrations.CreateModel(
            name='VocabularyData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('answers', models.JSONField()),
                ('correct', models.CharField(max_length=255)),
                ('errorText', models.TextField()),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vocabulary_data', to='app_backend.section')),
            ],
        ),
    ]
