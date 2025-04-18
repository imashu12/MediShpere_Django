from django.urls import path
from . import views
from django.urls import path

urlpatterns = [
    path("signup/", views.signup_view, name="signup"),
    path("login/", views.login_view, name='login'),
    path('verify-otp/', views.verify_otp, name='verify_otp'),
    path('logout/', views.logout_page, name='logout'),
    path('request-password-reset/', views.request_password_reset, name='request_password_reset'),  # Fix this
    path('verify-reset-otp/', views.verify_password_reset_otp, name='verify_reset_otp'),
    path('set-new-password/', views.set_new_password, name='set_new_password'),
]
