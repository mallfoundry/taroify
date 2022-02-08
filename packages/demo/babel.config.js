// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    [
      "taro",
      {
        framework: "react",
        ts: true,
      },
    ],
  ],
  plugins: [
    "lodash",
    [
      "import",
      {
        libraryName: "@taroify/core",
        libraryDirectory: "",
        style: true,
      },
      "@taroify/core",
    ],
    [
      "import",
      {
        libraryName: "@taroify/commerce",
        libraryDirectory: "",
        style: true,
      },
      "@taroify/commerce",
    ],
    // [
    //   "import",
    //   {
    //     libraryName: "@taroify/icons",
    //     libraryDirectory: "",
    //     camel2DashComponentName: false,
    //     style: () => "@taroify/icons/style",
    //   },
    //   "@taroify/icons",
    // ],
  ],
}
