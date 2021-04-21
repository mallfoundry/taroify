const { series, parallel } = require("gulp")
const { lintScss } = require("@taroify/cli")
const { buildTypescript, watchTypescript } = require("./typescript")
const { copyReadmeFiles, watchReadmeFiles } = require("./readme")
const { buildScss, watchScss } = require("./scss")
const { createBundle } = require("./bundle")
const { serveDemo, serveSite } = require("./serve")

function watch() {
  watchScss("icons")
  watchScss("core")
  watchTypescript("icons")
  watchTypescript("core")
  watchReadmeFiles("core/src")
  watchReadmeFiles("core/docs")
}

exports.clean = series(
  createBundle("core"), //
  createBundle("icons"),
)

exports.develop = parallel(
  createBundle("icons"), //
  createBundle("core"), //
  watch,
  serveDemo,
  serveSite,
)

exports.watch = watch

exports.build = series(
  createBundle("icons"),
  createBundle("core"), //
  buildScss("icons"),
  buildScss("core"), //
  buildTypescript("icons"),
  buildTypescript("core"), //
)

exports.readme = series(
  copyReadmeFiles("core/src"), //
  copyReadmeFiles("core/docs"), //
)

exports.serve = parallel(serveDemo, serveSite)

exports.lintScss = series(lintScss)
