from fastapi import FastAPI, Query
import os
import randfacts
from bson import Decimal128
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional

from fastapi.middleware.cors import CORSMiddleware

CONFIG = {
    "CORS_ALLOWED": ["*"]
}

app = FastAPI(title="Random Facts & Airbnb API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CONFIG["CORS_ALLOWED"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Setup
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/airbnb_listing")
print("\nMongoURL -> %s\n" % MONGO_URL)

client = AsyncIOMotorClient(MONGO_URL)
db = client.get_database()
collection = db["listings"]

def format_mongo_doc(doc):
    """
    Recursively format MongoDB document for JSON serialization.
    Handles _id and Decimal128.
    """
    if "_id" in doc:
        doc["_id"] = str(doc["_id"])
    
    for key, value in doc.items():
        if isinstance(value, Decimal128):
            doc[key] = str(value)
        elif isinstance(value, dict):
            format_mongo_doc(value)
        elif isinstance(value, list):
            for i in range(len(value)):
                if isinstance(value[i], dict):
                    format_mongo_doc(value[i])
                elif isinstance(value[i], Decimal128):
                    value[i] = str(value[i])
    return doc

@app.get("/randomfact")
async def get_random_facts():
    """
    Returns a list of 10 random facts.
    """
    facts = [randfacts.get_fact() for _ in range(10)]
    return {"facts": facts}

@app.get("/airbnb_listings")
async def get_airbnb_listings(page: int = Query(1, ge=1)):
    """
    Returns 10 Airbnb listings with pagination.
    Useful for "Load More" logic.
    """
    limit = 10
    skip = (page - 1) * limit
    
    # Identify useful fields for the listing view
    projection = {
        "_id": 1,
        "name": 1,
        "summary": 1,
        "listing_url": 1,
        "images.picture_url": 1,
        "price": 1,
        "address.street": 1,
        "property_type": 1,
        "room_type": 1,
        "accommodates": 1,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1
    }
    
    cursor = collection.find({}, projection).skip(skip).limit(limit)
    listings = []
    
    async for doc in cursor:
        listings.append(format_mongo_doc(doc))
        
    return {
        "page": page,
        "limit": limit,
        "count": len(listings),
        "listings": listings
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
