from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import customuser
from django_recaptcha.fields import ReCaptchaField


class SignUpForm(UserCreationForm):
    email = forms.EmailField(required=True, help_text="Required. Must be unique.")
    captcha=ReCaptchaField()

    class Meta:
        model = customuser
        fields = ("username", "email", "password1", "password2")

    def clean_email(self):
        email = self.cleaned_data.get("email")
        if customuser.objects.filter(email=email).exists():
            raise forms.ValidationError("A user with this email already exists.")
        return email

class loginforms(forms.Form):
    username=forms.CharField(widget=forms.TextInput(attrs={'placeholder':'Enter username'}), max_length=100, required=True)
    password = forms.CharField(required=True, widget=forms.PasswordInput(attrs={'placeholder': 'Enter Password'}))
    captcha=ReCaptchaField()

class otp_form(forms.Form):
    otp_code=forms.CharField(max_length=6,required=True)