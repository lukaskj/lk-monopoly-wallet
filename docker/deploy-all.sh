#!/bin/sh

docker compose build monopoly-wallet-backend
docker compose -p lk-monopoly-wallet down
docker compose -p lk-monopoly-wallet up -d
