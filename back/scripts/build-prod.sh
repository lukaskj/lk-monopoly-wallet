rimraf dist
nest build --webpack --webpackPath ./webpack.config.js
# nest build
cp .env pnpm-lock.yaml package.json dist/
# cp .env pnpm-lock.yaml package.json prisma/schema.prisma node_modules/prisma/query_engine-windows.dll.node dist/