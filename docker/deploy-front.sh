#!/bin/sh

docker compose build monopoly-wallet-frontend
docker compose down monopoly-wallet-frontend
docker compose up -d monopoly-wallet-frontend
