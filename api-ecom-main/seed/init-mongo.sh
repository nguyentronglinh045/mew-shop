#!/bin/bash
set -e

echo "[seed] Importing categories..."
mongoimport \
  --host=localhost --port=27017 \
  --username="$MONGO_INITDB_ROOT_USERNAME" \
  --password="$MONGO_INITDB_ROOT_PASSWORD" \
  --authenticationDatabase=admin \
  --db=main --collection=categories \
  --file=/seed-data/main.categories.json --jsonArray

echo "[seed] Importing products..."
mongoimport \
  --host=localhost --port=27017 \
  --username="$MONGO_INITDB_ROOT_USERNAME" \
  --password="$MONGO_INITDB_ROOT_PASSWORD" \
  --authenticationDatabase=admin \
  --db=main --collection=products \
  --file=/seed-data/main.products.json --jsonArray

echo "[seed] Done."
