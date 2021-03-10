from bson.objectid import ObjectId
import motor.motor_asyncio

MONGO_DETAILS = "mongodb://localhost:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.cat_db # change here to create new database

cat_collection = database.get_collection("cats_collection")

# helpers


def cat_helper(cat) -> dict:
    return {
        "id": str(cat["_id"]),
        "item": cat["item"],
    }


# Retrieve all cats present in the database
async def retrieve_cats():
    cats = []
    async for cat in cat_collection.find():
        cats.append(cat_helper(cat))
    return cats


# Add a new cat into to the database
async def add_cat(cat_data: dict) -> dict:
    cat = await cat_collection.insert_one(cat_data)
    new_cat = await cat_collection.find_one({"_id": cat.inserted_id})
    return cat_helper(new_cat)


# Retrieve a cat with a matching ID
async def retrieve_cat(id: str) -> dict:
    cat = await cat_collection.find_one({"_id": ObjectId(id)})
    if cat:
        return cat_helper(cat)


# Update a cat with a matching ID
async def update_cat(id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    cat = await cat_collection.find_one({"_id": ObjectId(id)})
    if cat:
        updated_cat = await cat_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_cat:
            return True
        return False


# Delete a cat from the database
async def delete_cat(id: str):
    cat = await cat_collection.find_one({"_id": ObjectId(id)})
    if cat:
        await cat_collection.delete_one({"_id": ObjectId(id)})
        return True