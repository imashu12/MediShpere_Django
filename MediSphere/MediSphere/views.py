from django.shortcuts import render

def home(request):
    return render(request,"home.html")

def about_us(requst):
    return render(requst,"about_us.html")

def contact_us(request):
    return render(request,"contact.html")