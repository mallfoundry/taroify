const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const gulp = require("gulp")
const { watch, series } = require("gulp")
const postcss = require("gulp-postcss")
const sass = require("gulp-sass")
const sourcemaps = require("gulp-sourcemaps")
// Set compiler
sass.compiler = require("sass")

function copyScssFiles(bundle, dist) {
  const copyScssFilesTask = () =>
    gulp
      .src(`./packages/${bundle}/src/**/*.scss`) //
      .pipe(gulp.dest(`./bundles/${dist ?? bundle}`))
  copyScssFilesTask.displayName = `copy scss files to bundles/${
    dist ?? bundle
  } from packages/${bundle}`
  return copyScssFilesTask
}

function symlinkScssFiles(bundle, dist) {
  const symlinkScssFilesTask = () =>
    gulp
      .src(`./packages/${bundle}/src/**/*.scss`) //
      .pipe(gulp.symlink(`./bundles/${dist ?? bundle}`))
  symlinkScssFilesTask.displayName = `symlink scss files to bundles/${
    dist ?? bundle
  } from packages/${bundle}`
  return symlinkScssFilesTask
}

function compileScss(bundle, dist) {
  const plugins = [autoprefixer(), cssnano()]

  const compileScssTask = () =>
    gulp
      .src(`./packages/${bundle}/src/**/index.scss`)
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
      .pipe(postcss(plugins))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(`./bundles/${dist ?? bundle}`))

  compileScssTask.displayName = `compile scss files to bundles/${
    dist ?? bundle
  } from packages/${bundle}`
  return compileScssTask
}

function buildScss(module, dist) {
  return series(copyScssFiles(module, dist), compileScss(module, dist))
}

function watchScss(module) {
  watch(
    [`./packages/${module}/src/**/*.scss`],
    {
      ignoreInitial: false,
    },
    series(copyScssFiles(module) /*, compileScss(module)*/),
  )
}

function watchScssSymlink(module) {
  watch(
    [`./packages/${module}/src/**/*.scss`],
    {
      events: ["add", "addDir", "unlink", "unlinkDir"],
      ignoreInitial: false,
    },
    series(symlinkScssFiles(module)),
  )
}

exports.buildScss = buildScss
exports.watchScss = watchScss
exports.watchScssSymlink = watchScssSymlink
