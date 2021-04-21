const { task } = require("gulp-execa")

exports.serveDemo = task("taro build --type h5 --watch", {
  cwd: "packages/demo",
  stdio: "inherit",
})

exports.serveSite = task("gatsby develop --open", {
  cwd: "site",
  stdio: "inherit",
})
