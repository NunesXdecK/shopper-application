import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  preset: "ts-jest",
  rootDir: ".",
  coverageProvider: "v8",
  testEnvironment: "node",
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  testRegex: "(/tests/.*|\\.(test|spec))\\.ts$",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testPathIgnorePatterns: ["/tests/.*\\.stub\\.ts$", "/tests/.*\\.mock\\.ts$"],
  coveragePathIgnorePatterns: [
    "\\.seed\\.ts$",
    "\\.enum\\.ts$",
    "\\.type\\.ts$",
    "\\.model\\.ts$",
    "\\.config\\.ts$",
    "\\.entity\\.ts$",
    "\\.module\\.ts$",
    "\\.factory\\.ts$",
  ],
};

export default config;
