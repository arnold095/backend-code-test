/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfig = require("./tsconfig.json");
console.info(tsconfig);
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      diagnostics: true,
      isolatedModules: true,
    },
  },
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper,
  testEnvironment: "node",
  transform: {
    "\\.ts$": "./jest.transformer",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testMatch: ["**/tests/**/*.test.ts?(x)"],
};
