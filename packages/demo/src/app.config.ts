import componentPages from "./component-pages"

function obtainComponentPagePaths() {
  const pagePaths: string[] = []
  for (const { children } of componentPages) {
    if (children) {
      for (const { path } of children) {
        if (path) {
          pagePaths.push(path)
        }
      }
    }
  }
  return pagePaths
}

export default {
  pages: ["pages/home/index", ...obtainComponentPagePaths()],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#4fc08d",
    navigationBarTitleText: "Taroify",
    navigationBarTextStyle: "black",
  },
}
