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

exports.copyH5 = function () {
  const copyH5Task = () =>
    gulp.src("./packages/demo/dist/h5/**").pipe(gulp.dest("./bundles/www/h5"))
  copyH5Task.displayName = "copy /dist/h5 files to bundles/www from packages/demo"
  return copyH5Task
}

exports.copyGitIgnore = function () {
  const copyGitIgnoreTask = () => gulp.src(".gitignore").pipe(gulp.dest("./bundles/www"))
  copyGitIgnoreTask.displayName = "copy .gitignore files to bundles/www"
  return copyGitIgnoreTask
}

exports.copySite = function () {
  const copySiteTask = () => gulp.src("./site/public/**").pipe(gulp.dest("./bundles/www"))
  copySiteTask.displayName = "copy /public files to bundles/www from site"
  return copySiteTask
}
