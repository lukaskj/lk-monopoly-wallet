#!/bin/sh

docker compose build
docker compose down monopoly-wallet-frontend
docker compose up -d monopoly-wallet-frontend
