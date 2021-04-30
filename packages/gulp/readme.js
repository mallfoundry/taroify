const gulp = require("gulp")
const { watch } = require("gulp")
const rename = require("gulp-rename")

function copyReadmeFiles(directory) {
  const copyReadmeFilesTask = () =>
    gulp
      .src([`./packages/${directory}/**/README*.md?(x)`], {})
      .pipe(
        rename((path) => {
          path.basename = "index"
        }),
      )
      .pipe(gulp.dest("./site/.content/components"))
  copyReadmeFilesTask.displayName = `copy README.md?(x) files to site/.contents/components from packages/${directory}`
  return copyReadmeFilesTask
}

function watchReadmeFiles(directory) {
  watch(
    [`./packages/${directory}/**/README*.md?(x)`],
    {
      // events: "all",
      ignoreInitial: false,
    },
    copyReadmeFiles(directory),
  )
}

exports.copyReadmeFiles = copyReadmeFiles
exports.watchReadmeFiles = watchReadmeFiles
