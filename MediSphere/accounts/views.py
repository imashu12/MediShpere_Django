from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from .forms import SignUpForm, loginforms
from django.contrib import messages
import random, string
from django.utils import timezone
from .models import OTP
from .forms import otp_form
from django.core.mail import send_mail
from .models import customuser
from django.utils.timezone import now
import hashlib

def generate_otp():
    return str(random.randint(100000, 999999))

def hash_otp(otp):
    return hashlib.sha256(otp.encode()).hexdigest()

def send_otp(user, otp):
    try:
        subject = "OTP Verification"
        txt = f"Your OTP is {otp}. It will expire in 5 minutes."
        send_mail(subject, txt, 'medisphere01@gmail.com', [user.email])
    except Exception as e:
        print(f"Error sending OTP email: {e}")

def signup_view(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            authenticated_user = authenticate(request, username=form.cleaned_data['username'], password=form.cleaned_data['password1'])
            if authenticated_user:
                login(request, authenticated_user)
                return redirect("home")
    else:
        form = SignUpForm()
    return render(request, "accounts/signup.html", {"form": form})

def login_view(request):
    if request.method == 'POST':
        form = loginforms(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                otp = generate_otp()
                OTP.objects.create(user=user, otp_code=hash_otp(otp), created_at=now())
                send_otp(user, otp)
                request.session['user_id'] = user.id
                return redirect('verify_otp')
            else:
                messages.error(request, 'Invalid username or password')
                return redirect('login')
    else:
        form = loginforms()
    return render(request, 'accounts/login.html', {'forms': form})

def verify_otp(request):
    if request.method == 'POST':
        otp_code = request.POST['otp_code']
        user_id = request.session.get('user_id')
        if user_id:
            try:
                user = customuser.objects.get(id=user_id)
                otp_entry = OTP.objects.filter(user=user).latest('created_at')

                # Check if OTP expired
                if (now() - otp_entry.created_at).seconds > 300:
                    messages.error(request, "OTP expired. Please login again.")
                    return redirect('login')

                # ✅ Check OTP and login with explicit backend
                if otp_entry.otp_code == hash_otp(otp_code):
                    user.backend = 'django.contrib.auth.backends.ModelBackend'  # <-- This is the fix
                    login(request, user)
                    messages.success(request, f"Login successful as {user.username}")
                    return redirect("home")  # ✅ don't forget to redirect!
                else:
                    messages.error(request, "Invalid OTP")
            except OTP.DoesNotExist:
                messages.error(request, "OTP not found for this user.")
    return render(request, 'accounts/verify_otp.html')
        
def logout_page(request):
    logout(request)
    return redirect('home')

def request_password_reset(request):
    if request.method == "POST":
        email = request.POST.get("email")
        user = customuser.objects.filter(email=email).first()

        if user:
            otp = generate_otp()
            OTP.objects.create(user=user, otp_code=hash_otp(otp), created_at=now())
            send_otp(user, otp)
            messages.success(request, "OTP sent to your email.")
            return redirect("verify_reset_otp")  # Redirect user to OTP verification

        messages.error(request, "Email not found.")
        return redirect("request_password_reset")

    return render(request, "accounts/request_password_reset.html")
  # ✅ Fix for GET request
  
def verify_password_reset_otp(request):
    if request.method == "POST":
        email = request.POST.get("email")
        otp_entered = request.POST.get("otp")

        if not email or not otp_entered:
            messages.error(request, "Invalid request. Missing email or OTP.")
            return redirect("home")

        try:
            # Fetch user using email
            user = customuser.objects.get(email=email)

            # Fetch the latest OTP entry for the user
            otp_entry = OTP.objects.filter(user=user).latest('created_at')

            # Check if OTP has expired (valid for 5 minutes)
            if (now() - otp_entry.created_at).seconds > 300:
                messages.error(request, "OTP expired. Please request a new OTP.")
                return redirect('request_password_reset')

            # Check if the entered OTP is correct
            if otp_entry.otp_code == hash_otp(otp_entered):
                messages.success(request, "OTP verified successfully")
                # Redirect to "set_new_password" page after OTP verification
                return redirect("set_new_password")  # Redirects to set new password page
            else:
                messages.error(request, "Invalid OTP. Please try again.")
                return redirect('verify_reset_otp')  # Rerenders the verify OTP page on failure

        except customuser.DoesNotExist:
            messages.error(request, "User not found with this email.")
            return redirect('home')  # Redirects to home page if user not found
        except OTP.DoesNotExist:
            messages.error(request, "No OTP found for this email.")
            return redirect('home')  # Redirects to home page if OTP not found

    # If GET request, render OTP verification page
    return render(request, "accounts/verify_otp.html")


def set_new_password(request):
    if request.method == "POST":
        email = request.POST.get("email")
        new_password = request.POST.get("new_password")
        user = customuser.objects.filter(email=email).first()
        if user:
            user.set_password(new_password)
            user.save()
            return HttpResponse("Password reset successfully. Please login with new password.")
    return HttpResponse("Invalid request", status=400)