const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const tsConfigFile = "tsconfig.build.json";

module.exports = (options, webpack) => {
  const lazyImports = [
    "@prisma/client",
    "aws-sdk",
    "bcryptjs",
    "mock-aws-s3",
    "nock",
    "dotenv",
    "@fastify/static",
    "@fastify/view",
    "@nestjs/microservices",
    "@nestjs/microservices/microservices-module",
    "@nestjs/platform-express",
    "@nestjs/websockets/socket-module",
    "amqp-connection-manager",
    "amqplib",
    "cache-manager",
    "cache-manager/package.json",
    "class-transformer/storage",
    "hbs",
    "ioredis",
    "kafkajs",
    "mqtt",
    "nats",
  ];

  return {
    ...options,
    entry: "./src/main.ts",
    externals: {},
    module: {
      ...options.module,
      rules: [
        {
          loader: "ts-loader",
          options: {
            experimentalWatchApi: true,
            transpileOnly: true,
          },
          test: /\.ts$/,
          exclude: [
            path.resolve(__dirname, "test/")
          ]
        },
      ],
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    optimization: {
      ...options.optimization,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            keep_classnames: true,
            keep_fnames: true,
          },
        }),
      ],
      nodeEnv: false,
    },
    output: {
      ...options.output,
      filename: "index.js",
      path: path.resolve(__dirname, "dist/"),
      libraryTarget: "commonjs",
    },
    plugins: [
      ...options.plugins,
      new ForkTsCheckerWebpackPlugin(),
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$/,
      }),
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (!lazyImports.includes(resource)) {
            return false;
          }
          try {
            require.resolve(resource, { paths: [process.cwd()] });
          } catch (err) {
            return true;
          }
          return false;
        },
      }),
    ],
    resolve: {
      extensions: [".js", ".json", ".ts"],
      mainFields: ["main"],
      plugins: [new TsconfigPathsPlugin({ configFile: tsConfigFile })],
    },
    target: "node",
  };
};
