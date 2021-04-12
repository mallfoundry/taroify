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
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.esm.js?$": "<rootDir>/node_modules/ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!@taro)", "^.+\\.(css|sass|scss|less)$"],
}
