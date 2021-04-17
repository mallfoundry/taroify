const { series, parallel } = require("gulp")
const { buildTypescript, watchTypescript } = require("./gulp/typescript")
const { copyReadmeFiles, watchReadmeFiles } = require("./gulp/readme")
const { buildScss, watchScss } = require("./gulp/scss")
const { buildBundle } = require("./gulp/bundle")
const { serveDemo, serveSite } = require("./gulp/serve")

function watch() {
  watchScss("icons")
  watchScss("core")
  watchTypescript("icons")
  watchTypescript("core")
  watchReadmeFiles("core/src")
  watchReadmeFiles("core/docs")
}

exports.develop = parallel(watch, serveDemo, serveSite)

exports.build = series( //
  buildBundle("icons"), buildBundle("core"), //
  buildScss("icons"), buildScss("core"), //
  buildTypescript("icons"), buildTypescript("core"),//
)

exports.readme = series(//
  copyReadmeFiles("core/src"),//
  copyReadmeFiles("core/docs"),//
)

exports.serve = parallel(serveDemo, serveSite)
