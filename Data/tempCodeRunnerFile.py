import json
import os
from pymongo import MongoClient

# === Load JSON Files ===
base_dir = os.path.dirname(__file__)  # <-- Corrected here

# Load hospitals.json
with open(os.path.join(base_dir, "hospitals.json"), "r", encoding="utf-8") as f:
    hospitals_data = json.load(f)

# Load bloodbank.json
with open(os.path.join(base_dir, "bloodbank.json"), "r", encoding="utf-8") as f:
    blood_banks_data = json.load(f)

# === Connect to MongoDB ===
client = MongoClient("mongodb://localhost:27017/")
db = client["medisphere"]

# === Clear old data (only for testing/dev) ===
db["hospitals"].delete_many({})
db["blood_banks"].delete_many({})

# === Insert data ===
db["hospitals"].insert_many(hospitals_data)
db["blood_banks"].insert_many(blood_banks_data)

print("✅ Hospitals and Blood Banks inserted into MongoDB.")
