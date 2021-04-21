module.exports = {
  extends: ["react-app", "prettier"],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  rules: {
    quotes: ["error", "double"],
    "jsx-quotes": ["error", "prefer-double"],
    "import/order": ["error"],
  },
}
