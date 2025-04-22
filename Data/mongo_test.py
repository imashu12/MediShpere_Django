from pymongo import MongoClient
import pprint

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["medisphere"]

# Pretty print setup
pp = pprint.PrettyPrinter(indent=2)

# === Fetch and print some hospital data ===
print("\n🏥 Sample Hospitals in MongoDB:")
hospitals = db["hospitals"].find().limit(3)
for hospital in hospitals:
    pp.pprint(hospital)

# === Fetch and print some blood bank data ===
print("\n🩸 Sample Blood Banks in MongoDB:")
blood_banks = db["blood_banks"].find().limit(3)
for blood_bank in blood_banks:
    pp.pprint(blood_bank)