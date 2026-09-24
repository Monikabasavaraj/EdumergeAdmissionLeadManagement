# from rest_framework import serializers
# from .models import Counsellor, Lead, FollowUp


# class CounsellorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Counsellor
#         fields = '__all__'


# class LeadSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Lead
#         fields = '__all__'


# class FollowUpSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = FollowUp
#         fields = '__all__'




from rest_framework import serializers
from .models import Counsellor, Lead, FollowUp


class CounsellorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Counsellor
        fields = "__all__"


class LeadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lead
        fields = "__all__"

    def validate_phone(self, value):
        cleaned_phone = value.strip()

        if not cleaned_phone.isdigit():
            raise serializers.ValidationError(
                "Phone number must contain only digits."
            )

        if len(cleaned_phone) < 10 or len(cleaned_phone) > 15:
            raise serializers.ValidationError(
                "Phone number must be between 10 and 15 digits."
            )

        return cleaned_phone

    def validate_email(self, value):
        return value.strip().lower()

    def validate(self, data):
        email = data.get(
            "email",
            getattr(self.instance, "email", None)
        )

        phone = data.get(
            "phone",
            getattr(self.instance, "phone", None)
        )

        existing_leads = Lead.objects.filter(
            email=email,
            phone=phone
        )

        if self.instance:
            existing_leads = existing_leads.exclude(
                id=self.instance.id
            )

        if existing_leads.exists():
            raise serializers.ValidationError(
                "A lead with this email and phone already exists."
            )

        status = data.get(
            "status",
            getattr(self.instance, "status", "New")
        )

        lost_reason = data.get(
            "lost_reason",
            getattr(self.instance, "lost_reason", None)
        )

        if status == "Lost" and not lost_reason:
            raise serializers.ValidationError({
                "lost_reason":
                    "Lost reason is required when lead status is Lost."
            })

        return data


# class FollowUpSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = FollowUp
#         fields = "__all__"

#     def validate_notes(self, value):
#         if not value.strip():
#             raise serializers.ValidationError(
#                 "Follow-up notes cannot be empty."
#             )

#         return value.strip()


class FollowUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = FollowUp
        fields = "__all__"

    def validate_notes(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Follow-up notes cannot be empty."
            )

        return value.strip()

    def validate(self, data):
        scheduled_date = data.get(
            "scheduled_date",
            getattr(
                self.instance,
                "scheduled_date",
                None
            )
        )

        if not scheduled_date:
            raise serializers.ValidationError({
                "scheduled_date":
                    "Scheduled date is required."
            })

        return data