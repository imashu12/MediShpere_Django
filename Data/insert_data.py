import json
import os
from pymongo import MongoClient

# === Load JSON Files ===
base_dir = os.path.dirname(__file__)  # Automatically detects current folder

# Load hospitals.json
hospitals_file_path = os.path.join(base_dir, "hospitals.json")
with open(hospitals_file_path, "r", encoding="utf-8") as f:
    hospitals_data = json.load(f)

# Load bloodbank.json
blood_banks_file_path = os.path.join(base_dir, "bloodbank.json")
with open(blood_banks_file_path, "r", encoding="utf-8") as f:
    blood_banks_data = json.load(f)

# === Connect to MongoDB ===
client = MongoClient("mongodb://localhost:27017/")  # MongoDB default local connection
db = client["medisphere"]  # Database name: medisphere

# === Clear old data ===
db["hospitals"].delete_many({})    # Clear previous hospital entries
db["blood_banks"].delete_many({})  # Clear previous blood bank entries

# === Insert fresh data ===
db["hospitals"].insert_many(hospitals_data)
db["blood_banks"].insert_many(blood_banks_data)

print("✅ Hospitals and Blood Banks inserted into MongoDB successfully!")
