rimraf dist
nest build --webpack --webpackPath ./webpack.config.js
# nest build
cp .env pnpm-lock.yaml package.json dist/

FILES=('prisma/schema.prisma' 'node_modules/prisma/query_engine-windows.dll.node')

for file in "${FILES[@]}"
do
  if [ -f "$file" ]; then
    cp $file dist/
  fi
done
