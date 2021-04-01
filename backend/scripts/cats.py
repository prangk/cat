import json
import logging

import motor.motor_asyncio
import asyncio

BASIC_COLLECTION = 'cats/cats.json'
RICH_COLLECTION_PATH = 'cats/collections'

MONGO_DETAILS = "mongodb://localhost:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.cat_db # change here to create new database

cat_collection = database.get_collection("cats_collection")

logging.basicConfig(level=logging.DEBUG,
                    format='%(levelname)s %(asctime)s: %(message)s')

logging.debug(f'Mongo Conn String: {MONGO_DETAILS}')


def load_json(json_path: str):
    with open(json_path, 'r', encoding='utf-8') as f:
        json_obj = json.load(f)

    return json_obj


async def do_insert(basic_dict):
    result = await cat_collection.insert_many([i for i in basic_dict])
    print(result)


def main():
    # pass
    basic_dict = load_json(json_path=BASIC_COLLECTION)

    loop = asyncio.get_event_loop()
    loop.run_until_complete(do_insert(basic_dict))


if __name__ == '__main__':
    main()