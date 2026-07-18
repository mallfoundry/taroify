const gulp = require("gulp")
const { watch } = require("gulp")

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

function symlinkFontFiles(bundle, dist) {
  const symlinkFontFilesTask = () =>
    gulp
      .src(`./packages/${bundle}/src/**/*.{eot,svg,ttf,woff}`) //
      .pipe(gulp.symlink(`./bundles/${dist ?? bundle}`))
  symlinkFontFilesTask.displayName = `symlink font files to bundles/${
    dist ?? bundle
  } from packages/${bundle}`
  return symlinkFontFilesTask
}

function watchFontFilesSymlink(bundle, dist) {
  watch(
    [`./packages/${bundle}/src/**/*.{eot,svg,ttf,woff}`],
    {
      events: ["add", "addDir", "unlink", "unlinkDir"],
      ignoreInitial: true,
    },
    symlinkFontFiles(bundle, dist),
  )
}

exports.copyFontFiles = copyFontFiles
exports.symlinkFontFiles = symlinkFontFiles
exports.watchFontFilesSymlink = watchFontFilesSymlink
