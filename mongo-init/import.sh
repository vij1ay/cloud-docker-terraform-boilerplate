#!/bin/bash
set -e

echo "Waiting for Mongo..."

sleep 5

DB="airbnb_listing"

echo "Importing listings..."
mongoimport \
  --db $DB \
  --collection listings \
  --file /docker-entrypoint-initdb.d/data/listings.json \
  --batchSize 250

echo "Mongo import done."

