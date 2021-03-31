# Initialize and build airport collection
import json
import logging
import os
from os import environ

from bson.objectid import ObjectId
import motor.motor_asyncio

BASIC_COLLECTION = 'airports/basic.json'
RICH_COLLECTION_PATH = 'airports/collections'

MONGO_DETAILS = "mongodb://localhost:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.cat_db # change here to create new database

cat_collection = database.get_collection("cats_collection")

logging.basicConfig(level=logging.DEBUG,
                    format='%(levelname)s %(asctime)s: %(message)s')

logging.debug(f'Mongo Conn String: {MONGO_DETAILS}')


def cat_helper(cat) -> dict:
    return {
        "id": str(cat["_id"]),
        "item": cat["item"],
    }



def load_json(json_path: str):
    with open(json_path, 'r', encoding='utf-8-sig') as f:
        json_obj = json.load(f)

    return json_obj


def main():
    basic_dict = load_json(json_path=BASIC_COLLECTION)
    basic_coll = []
    for k, v in basic_dict.items():
        basic_coll.append(v)

    def _upper(row):
        row['iata'] = row['iata'].upper()
        return row

    basic_coll = seq(basic_coll)\
        .filter(lambda x: x.get('iata') is not None and x.get('iata') != '')\
        .map(_upper)

    def _merge(rich_row):
        basic_row = basic_coll.find(lambda x: x.get('iata') == rich_row.get('id').upper())

        airport = Airport()
        airport.iata = rich_row.get('id').upper()
        airport.name = rich_row.get('name')
        airport.name_english = rich_row.get('nameEnglish')
        airport.city = rich_row.get('city')
        airport.country = rich_row.get('country')
        airport.description = rich_row.get('description')
        airport.location = GeoJson()
        airport.location.type = 'Point'
        airport.location.coordinates = [basic_row.get('lon'), basic_row.get('lat')]

        return airport

    rich_coll = []
    for root, dirs, files in os.walk(RICH_COLLECTION_PATH):
        rich_coll = seq(files)\
            .filter(lambda x: basic_coll.find(lambda y: y.get('iata') == x.replace('.json', '').upper()) is not None)\
            .map(lambda x: os.path.join(root, x))\
            .map(lambda x: load_json(json_path=x))\
            .map(_merge)\
            .to_list()

    logging.debug(f'We have {len(rich_coll)} cleaned airports')

    logging.debug('Connecting to MongoDB')
    connect(host=MONGO_CONN_STRING)

    logging.debug('Going to bulk insert to MongoDB')
    Airport.objects.insert(rich_coll)

    logging.debug('Disconnecting from MongoDB')
    disconnect()


if __name__ == '__main__':
    main()