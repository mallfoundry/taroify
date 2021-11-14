const gulp = require("gulp")
const { watch } = require("gulp")
const rename = require("gulp-rename")

function copyReadmeFiles(src, dest) {
  const copyReadmeFilesTask = () =>
    gulp
      .src([`./packages/${src}/**/README*.md?(x)`], {
        ignore: "**/node_modules/**",
      })
      .pipe(
        rename((path) => {
          path.basename = "index"
        }),
      )
      .pipe(gulp.dest(`./site/.content/${dest}`))
  copyReadmeFilesTask.displayName = `copy README.md?(x) files to site/.contents/${dest} from packages/${src}`
  return copyReadmeFilesTask
}

function watchReadmeFiles(src, dest) {
  watch(
    [`./packages/${src}/**/README*.md?(x)`],
    {
      // events: "all",
      ignoreInitial: false,
    },
    copyReadmeFiles(src, dest),
  )
}

exports.copyReadmeFiles = copyReadmeFiles
exports.watchReadmeFiles = watchReadmeFiles
