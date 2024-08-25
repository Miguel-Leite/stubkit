import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(module-to-transform|another-module))",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/src/**/*.test.(ts|tsx)"],
  moduleNameMapper: {
    "^@adapters/(.*)$": "<rootDir>/src/adapters/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@ports/(.*)$": "<rootDir>/src/ports/$1",
    // "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
