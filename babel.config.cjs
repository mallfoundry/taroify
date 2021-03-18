module.exports = {
  presets: [
    ["@babel/preset-env", {}],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    ["@babel/plugin-transform-typescript", {
      sourceMaps: "both",
    }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ],
}
