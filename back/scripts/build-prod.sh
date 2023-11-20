#!/bin/sh
rm -rf dist
nest build --webpack --webpackPath ./webpack.config.js
# nest build
cp .env pnpm-lock.yaml package.json dist/

# BASH
# FILES=('prisma/schema.prisma' 'node_modules/prisma/query_engine-windows.dll.node')
# for file in "${FILES[@]}"
# do
#   if [ -f "$file" ]; then
#     cp $file dist/
#   fi
# done

[[ -e 'prisma/schema.prisma' ]] && cp 'prisma/schema.prisma' dist/
[[ -e 'node_modules/prisma/query_engine-windows.dll.node' ]] && cp 'node_modules/prisma/query_engine-windows.dll.node' dist/
[[ -e 'node_modules/prisma/libquery_engine-linux-musl-openssl-3.0.x.so.node' ]] && cp 'node_modules/prisma/libquery_engine-linux-musl-openssl-3.0.x.so.node' dist/
