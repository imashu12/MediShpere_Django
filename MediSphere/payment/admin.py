from django.contrib import admin
from .models import Razorpay  # Model import karo

class RazorpayAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'amount', 'payment_id', 'status')  # Admin panel me show hone wale columns
    search_fields = ('username__username', 'payment_id')  # Search enable karo
    list_filter = ('status',)  # Filter enable karo

# Ya phir traditional way:
admin.site.register(Razorpay, RazorpayAdmin)
