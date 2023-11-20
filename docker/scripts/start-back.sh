#!/bin/sh
cd /app
npx prisma migrate deploy --schema=/app/prisma/schema.prisma
node index.js