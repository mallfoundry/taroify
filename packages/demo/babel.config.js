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
        // style: (name) => {
        //   if (
        //     [
        //       "@taroify/core/button",
        //       "@taroify/core/transition",
        //       "@taroify/core/backdrop",
        //       "@taroify/core/toast",
        //       "@taroify/core/popup",
        //       "@taroify/core/loading",
        //       "@taroify/core/picker",
        //     ].includes(name)
        //   ) {
        //     return `${name}/style`
        //   }
        //   return `${name}/index.scss`
        // },
      },
      "@taroify/core",
    ],
  ],
}
