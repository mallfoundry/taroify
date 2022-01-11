/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "@tarojs/components": "@tarojs/components/dist-h5/react",
  },
  setupFilesAfterEnv: ["<rootDir>/jest/jest-setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: [
    "<rootDir>/packages/**/__tests__/**/*.[jt]s?(x)",
    "<rootDir>/packages/**/?(*.)+(spec|test).[tj]s?(x)",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!@taro)", "^.+\\.(css|sass|scss|less)$"],
}
