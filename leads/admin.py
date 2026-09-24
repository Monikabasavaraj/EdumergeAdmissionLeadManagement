from django.contrib import admin
from .models import Counsellor, Lead, FollowUp


admin.site.register(Counsellor)
admin.site.register(Lead)
admin.site.register(FollowUp)