#!/bin/sh
# docker compose up -d --no-deps --build monopoly-wallet-backend

docker compose build
docker compose down monopoly-wallet-backend
docker compose up -d monopoly-wallet-backend