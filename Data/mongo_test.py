from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["medisphere"]
collection = db["hospitals"]

# Fetch all documents
documents = collection.find()

print("\n📄 All Documents in 'hospitals' Collection:\n")
for doc in documents:
    print(f"City: {doc.get('city')}")
    for i, hospital in enumerate(doc.get("hospitals", []), 1):
        print(f"  {i}. {hospital}")
    print("-" * 50)