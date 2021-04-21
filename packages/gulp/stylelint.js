const gulp = require("gulp")

function lintScss(bundle, dist) {
  const stylelint = require("gulp-stylelint")
  const lintScssTask = () =>
    gulp
      .src(`./packages/${bundle}/src/**/*.scss`)
      .pipe(
        stylelint({
          fix: true,
          reporters: [{ formatter: "string", console: true }],
        }),
      )
      .pipe(gulp.dest(`./packages/${dist ?? bundle}/src`))
  lintScssTask.displayName = "lint scss files"
  return lintScssTask
}

exports.lintScss = lintScss("core")
