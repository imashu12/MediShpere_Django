
from django.http import JsonResponse
import json
import os
from pymongo import MongoClient
from django.shortcuts import render
from django.contrib.auth.decorators import login_required



# ✅ MongoDB connection setup
client = MongoClient("mongodb://localhost:27017/")
db = client["medisphere"]  # Replace with your DB name
collection = db["blood_banks"]  # Replace with your collection name

def home(request):
    return render(request,"home.html")

def about_us(requst):
    return render(requst,"about_us.html")

def contact_us(request):
    return render(request,"contact.html")

@login_required
def records(request):
    return render(request,"records.html")


@login_required
def search_blood_banks(request):
    if request.method == "GET":
        # Fetch city from the query parameters
        city = request.GET.get('city', '').strip().lower()

        # Fetch the blood banks collection from MongoDB
        blood_banks = db["blood_banks"].find()

        # Filter blood banks based on the city
        filtered_blood_banks = [bank for bank in blood_banks if bank.get('City', '').lower() == city]

        # If no blood banks match the city, return an error response
        if not filtered_blood_banks:
            return JsonResponse({"error": "No blood banks found for the given city."}, status=404)

        # Return the filtered blood banks as a JSON response
        return JsonResponse({"blood_banks": filtered_blood_banks}, safe=False)

    return JsonResponse({"error": "Invalid request"}, status=400)

@login_required
def render_search_blood_banks(request):
    if request.method == "GET":
        city = request.GET.get('city', '').strip().lower()
        blood_banks = db["blood_banks"].find()
        filtered_blood_banks = [bank for bank in blood_banks if bank.get('city', '').lower() == city]  # ✅ correct
        return render(request, "blood.html", {
            "blood_banks": filtered_blood_banks,
            "searched_city": city
        })
    return render(request, "blood.html")

from django.shortcuts import render
from pymongo import MongoClient

@login_required
def hospitals_view(request):
    client = MongoClient("mongodb://localhost:27017/")
    db = client["medisphere"]
    hospitals_collection = db["hospitals"]

    hospitals = []  # Default: empty hospitals

    if request.method == "POST":
        location_query = request.POST.get('location', '')
        name_query = request.POST.get('hospital', '')

        query = {}
        if location_query:
            query["location.city"] = {"$regex": location_query, "$options": "i"}
        if name_query:
            query["hospital_name"] = {"$regex": name_query, "$options": "i"}

        hospitals = list(hospitals_collection.find(query))
    
    else:
        # Show all hospitals if first time page open (optional)
        hospitals = list(hospitals_collection.find())

    return render(request, "hospitals.html", {"hospitals": hospitals})
