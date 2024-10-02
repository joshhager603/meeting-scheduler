# Generated by Django 5.1.1 on 2024-10-02 01:35

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Meetings",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("title", models.CharField(max_length=100)),
                ("date", models.DateField()),
                ("time", models.TimeField()),
                ("location", models.CharField(max_length=2000)),
                ("details", models.CharField(max_length=10000)),
            ],
        ),
        migrations.CreateModel(
            name="Calendars",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("title", models.CharField(max_length=2000)),
                ("details", models.CharField(max_length=10000)),
                ("meetings", models.ManyToManyField(to="meetingschedulerapp.meetings")),
            ],
        ),
        migrations.CreateModel(
            name="Attachments",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("url", models.URLField()),
                (
                    "meeting_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="meetingschedulerapp.meetings",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Participants",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("name", models.CharField(max_length=600)),
                ("email", models.EmailField(max_length=254)),
                (
                    "meeting_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="meetingschedulerapp.meetings",
                    ),
                ),
            ],
        ),
    ]
