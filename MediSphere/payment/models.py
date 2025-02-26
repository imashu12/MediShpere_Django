from django.db import models
from django.conf import settings

class Razorpay(models.Model):
    username=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    amount=models.CharField(max_length=100)
    payment_id=models.CharField(max_length=100)
    status=models.BooleanField(default=False)
# Create your models here.
