from pymongo import MongoClient
import pprint

# === Connect to MongoDB ===
client = MongoClient("mongodb://localhost:27017/")
db = client["medisphere"]  # Database name: medisphere

# === Pretty print setup ===
pp = pprint.PrettyPrinter(indent=2)

# === Fetch and print some hospital data ===
print("\n🏥 Sample Hospitals from MongoDB:")
hospitals_cursor = db["hospitals"].find().limit(3)

for hospital in hospitals_cursor:
    pp.pprint(hospital)

# === Fetch and print some blood bank data ===
print("\n🩸 Sample Blood Banks from MongoDB:")
blood_banks_cursor = db["blood_banks"].find().limit(3)

for blood_bank in blood_banks_cursor:
    pp.pprint(blood_bank)
