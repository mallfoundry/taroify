import __subpackages__ from "./subpackages"

const subPackages = __subpackages__.map(({ root, pages }) => ({
  root,
  pages: pages.map(({ path }) => path) as string[],
}))

export default defineAppConfig({
  window: {
    backgroundColor: "@backgroundColor",
    backgroundTextStyle: "@backgroundTextStyle",
    navigationBarBackgroundColor: "@navigationBarBackgroundColor",
    navigationBarTitleText: "Taroify",
    navigationBarTextStyle: "@navigationBarTextStyle",
    allowsBounceVertical: "NO",
  },
  pages: ["pages/home/index"],
  subpackages: subPackages,
  subPackages,
  animation: false,
  darkmode: true,
  themeLocation: "theme.json",
})
