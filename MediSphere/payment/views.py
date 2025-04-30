import razorpay
import os
from dotenv import load_dotenv
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Load environment variables
load_dotenv()

PUBLIC_KEY = os.getenv('RAZERPAY_PUBLIC_KEY')
SECRET_KEY = os.getenv('RAZERPAY_SECRET_KEY')

# Razorpay client
client = razorpay.Client(auth=(PUBLIC_KEY, SECRET_KEY))


# OPTIONAL view if you want to test Razorpay manually
def pay(request):
    return render(request, "payment.html", {'key': PUBLIC_KEY})


@csrf_exempt
def create_payment(request):
    if request.method == "POST":
        try:
            amount = int(request.POST.get("amount", 0)) * 100  # ₹ to paise
            hospital_name = request.POST.get("hospital_name", "Hospital")

            if amount <= 0:
                return JsonResponse({"error": "Invalid amount"}, status=400)

            # Create Razorpay order
            order = client.order.create({
                "amount": amount,
                "currency": "INR",
                "payment_capture": 1
            })

            # Send order info to frontend
            return JsonResponse({
                "order_id": order["id"],
                "amount": order["amount"],
                "hospital_name": hospital_name,
                "KEY": PUBLIC_KEY
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid Request"}, status=400)
