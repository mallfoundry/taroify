module.exports = (api) => {
  const isTest = api.env("test")
  api.cache(true)
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          modules: isTest ? "auto" : false,
          targets: {
            esmodules: true,
          },
        },
      ],
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: [
      [
        "@babel/plugin-transform-typescript",
        {
          sourceMaps: "both",
        },
      ],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      "lodash",
    ],
  }
}
