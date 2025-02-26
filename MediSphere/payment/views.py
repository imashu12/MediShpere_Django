import razorpay
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


client = razorpay.Client(auth=("rzp_test_ynB5DSookuqqMX", "0bGq3HJRyemLOcMwDsahOaT2"))

def pay(request):
    return render(request, "payment.html")

@csrf_exempt  # Disable CSRF for testing (Not recommended for production)

def create_payment(request):
    if request.method == "POST":
        try:
            amount = int(request.POST.get("amount", 0)) * 100  # Convert to paise
            if amount <= 0:
                return JsonResponse({"error": "Invalid amount"}, status=400)

            payment_data = {
                "amount": amount,
                "currency": "INR",
                "payment_capture": "1",  # Auto capture payment
            }
            order = client.order.create(data=payment_data)

            return JsonResponse({"order_id": order["id"], "amount": order["amount"]})
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid Request"}, status=400)
