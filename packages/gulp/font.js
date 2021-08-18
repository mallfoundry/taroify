const gulp = require("gulp")

function copyFontFiles(bundle, dist) {
  const copyFontFilesTask = () =>
    gulp
      .src(`./packages/${bundle}/src/**/*.{eot,svg,ttf,woff}`) //
      .pipe(gulp.dest(`./bundles/${dist ?? bundle}`))
  copyFontFilesTask.displayName = `copy font files to bundles/${
    dist ?? bundle
  } from packages/${bundle}`
  return copyFontFilesTask
}

exports.copyFontFiles = copyFontFiles
