import json
import os
import pandas as pd
from pymongo import MongoClient

# Get path to hospitals.json file (same folder as this script)
file_path = os.path.join(os.path.dirname(__file__), "hospitals.json")

# Load JSON data from file
with open(file_path, "r", encoding="utf-8") as file:
    data = json.load(file)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["medisphere"]
collection = db["hospitals"]

# Clear existing data (optional: only for dev/testing phase)
collection.delete_many({})

# Insert data: one document per city with array of hospitals
for entry in data:
    city = entry.get("city")
    hospitals = entry.get("hospitals", [])

    if city and hospitals:
        doc = {
            "city": city,
            "hospitals": hospitals
        }
        collection.insert_one(doc)

print("✅ Data inserted successfully into MongoDB!")
df = pd.read_csv("blood-banks.csv")

# Convert to JSON structure
blood_banks = []
for _, row in df.iterrows():
    blood_bank = {
        "name": row["Blood Bank Name"],
        "state": row["State"],
        "district": row["District"],
        "city": row["City"],
        "address": row["Address"],
        "pincode": row["Pincode"],
        "contact": row["Contact No"],
        "mobile": row["Mobile"],
        "helpline": row.get("Helpline", ""),
        "fax": row.get("Fax", ""),
        "email": row.get("Email", ""),
        "website": row.get("Website", ""),
        "nodal_officer": {
            "name": row["Nodal Officer"],
            "contact": row["Contact Nodal Officer"],
            "mobile": row["Mobile Nodal Officer"],
            "email": row["Email Nodal Officer"],
            "qualification": row.get("Qualification Nodal Officer", "")
        },
        "category": row["Category"],
        "blood_component_available": row["Blood Component Available"],
        "apheresis": row["Apheresis"],
        "service_time": row["Service Time"],
        "license_number": row["License #"],
        "date_license_obtained": row["Date License Obtained"],
        "date_of_renewal": row["Date of Renewal"],
        "latitude": row["Latitude"],
        "longitude": row["Longitude"]
    }
    blood_banks.append(blood_bank)

# Save to JSON file
with open("blood_banks_medisphere.json", "w", encoding="utf-8") as f:
    json.dump(blood_banks, f, indent=2)

print("✅ JSON file saved as 'blood_banks_medisphere.json'")