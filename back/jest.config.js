/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  setupFiles: ["../test/jest-setup.ts"],
  clearMocks: true,
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "./src",
  testRegex: ".spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
  maxWorkers: "50%",
  collectCoverage: false,
  coverageDirectory: "../coverage",
  coverageProvider: "v8",
  coverageReporters: ["json", "text", "lcov", "clover"],
  collectCoverageFrom: [
    "**/*.{ts,js}",
    "!**/types.ts",
    "!**/models/*.ts",
    "!**/entities/*.ts",
    "!database/migrations/*.ts",
    "!database/ormconfig.ts",
    "!**/main.ts",
    "!**/*.fixture.ts",
    "!**/*.module.ts",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/handlers.ts",
    "!**/dotenv.init.ts",
  ],
  roots: ["<rootDir>"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: __dirname }),
  modulePaths: ["<rootDir>"],
};
