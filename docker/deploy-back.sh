#!/bin/sh
# docker compose up -d --no-deps --build monopoly-wallet-backend

docker compose build monopoly-wallet-backend
docker compose -p lk-monopoly-wallet down monopoly-wallet-backend
docker compose -p lk-monopoly-wallet up -d monopoly-wallet-backend