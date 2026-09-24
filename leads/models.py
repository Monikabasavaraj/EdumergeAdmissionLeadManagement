from django.db import models


class Counsellor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name


class Lead(models.Model):

    SOURCE_CHOICES = [
        ('Website', 'Website'),
        ('Walk-in', 'Walk-in'),
        ('Phone', 'Phone'),
        ('WhatsApp', 'WhatsApp'),
        ('Fair', 'Fair'),
        ('Campaign', 'Campaign'),
        ('Other', 'Other'),
    ]

    STATUS_CHOICES = [
        ('New', 'New'),
        ('Contacted', 'Contacted'),
        ('Follow-up', 'Follow-up'),
        ('Interested', 'Interested'),
        ('Application', 'Application'),
        ('Converted', 'Converted'),
        ('Lost', 'Lost'),
    ]

    PRIORITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    name = models.CharField(max_length=100)

    phone = models.CharField(max_length=15)

    email = models.EmailField()

    course = models.CharField(max_length=150)
    secondary_course = models.CharField(
    max_length=150,
    blank=True,
    null=True
)

    source = models.CharField(
        max_length=50,
        choices=SOURCE_CHOICES
    )

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='New'
    )

    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default='Medium'
    )

    counsellor = models.ForeignKey(
        Counsellor,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    lost_reason = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.name


class FollowUp(models.Model):

    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
    ]

    lead = models.ForeignKey(
        Lead,
        on_delete=models.CASCADE,
        related_name='followups'
    )

    scheduled_date = models.DateTimeField()

    notes = models.TextField()

    next_action = models.CharField(
        max_length=255,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Pending'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.lead.name} - {self.scheduled_date}"