import __subpackages__ from "./subpackages"

const subPackages = __subpackages__.map(({ root, pages }) => ({
  root,
  pages: pages.map(({ path }) => path) as string[],
}))

export default defineAppConfig({
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#4fc08d",
    navigationBarTitleText: "Taroify",
    navigationBarTextStyle: "black",
    allowsBounceVertical: "NO",
  },
  pages: ["pages/home/index"],
  subpackages: subPackages,
  subPackages,
  animation: false,
})
