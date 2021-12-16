const { task } = require("gulp-execa")
const gulp = require("gulp")

exports.buildH5 = task("taro build --type h5", {
  cwd: "packages/demo",
  stdio: "inherit",
})

exports.buildSite = task("gatsby build --prefix-paths", {
  cwd: "site",
  stdio: "inherit",
})

exports.copyH5 = function copyH5() {
  const copyH5Task = () =>
    gulp.src("./packages/demo/dist/h5/**").pipe(gulp.dest("./bundles/site/h5"))
  copyH5Task.displayName = "copy /dist/h5 files to bundles/site from packages/demo"
  return copyH5Task
}

exports.copySite = function copySite() {
  const copySiteTask = () => gulp.src("./site/public/**").pipe(gulp.dest("./bundles/site"))
  copySiteTask.displayName = "copy /public files to bundles/site from site"
  return copySiteTask
}
