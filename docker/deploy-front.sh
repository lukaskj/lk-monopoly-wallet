#!/bin/sh

docker compose build monopoly-wallet-frontend
docker compose -p lk-monopoly-wallet down monopoly-wallet-frontend
docker compose -p lk-monopoly-wallet up -d monopoly-wallet-frontend
