const { series, parallel } = require("gulp")
const { task } = require("gulp-execa")
const {
  buildTypescript,
  symlinkTypescriptFiles,
  watchTypescript,
  watchTypescriptSymlink,
} = require("./typescript")
const { copyReadmeFiles, watchReadmeFiles } = require("./readme")
const { buildScss, symlinkScssFiles, watchScss, watchScssSymlink } = require("./scss")
const { createBundle, cleanBundle } = require("./bundle")
const { detectPort, serveDemo, serveSite } = require("./serve")
const { copyFontFiles, symlinkFontFiles, watchFontFilesSymlink } = require("./font")
const { buildH5, buildSite, copyH5, copySite, copyGitIgnore } = require("./www")

function watch() {
  watchScss("icons")
  watchScss("core")
  watchTypescript("icons")
  watchTypescript("hooks")
  watchTypescript("core")
  watchTypescript("commerce")
  watchReadmeFiles("commerce/src", "components")
  watchReadmeFiles("core/src", "components")
  watchReadmeFiles("core/docs", "components")
  watchReadmeFiles("hooks/src", "hooks")
}

function watchSymlink() {
  watchScssSymlink("icons")
  watchScssSymlink("core")
  watchTypescriptSymlink("icons")
  watchTypescriptSymlink("hooks")
  watchTypescriptSymlink("core")
  watchTypescriptSymlink("commerce")
  watchFontFilesSymlink("core")
  watchFontFilesSymlink("commerce")
  watchReadmeFiles("core/src", "components")
  watchReadmeFiles("core/docs", "components")
  watchReadmeFiles("commerce/src", "components")
  watchReadmeFiles("hooks/src", "hooks")
}

const createBundles = parallel(
  createBundle("icons"),
  createBundle("hooks"),
  createBundle("core"),
  createBundle("commerce"),
)

exports.createBundles = createBundles

const symlinkBundles = parallel(
  symlinkScssFiles("icons"),
  symlinkScssFiles("core"),
  symlinkTypescriptFiles("icons"),
  symlinkTypescriptFiles("hooks"),
  symlinkTypescriptFiles("core"),
  symlinkTypescriptFiles("commerce"),
  symlinkFontFiles("core"),
  symlinkFontFiles("commerce"),
)

exports.symlinkBundles = symlinkBundles

exports.clean = series(
  createBundles,
  task("gatsby clean", {
    cwd: "site",
    stdio: "inherit",
  }),
)

exports.develop = series(
  detectPort,
  createBundles,
  symlinkBundles,
  parallel(watchSymlink, serveDemo, serveSite),
)

exports.watch = watch

exports.buildPackages = series(
  createBundles, //
  copyFontFiles("core"),
  copyFontFiles("commerce"),
  buildScss("icons"),
  buildScss("core"),
  buildScss("commerce"),
  buildTypescript("icons"),
  buildTypescript("hooks"),
  buildTypescript("core"),
  buildTypescript("commerce"),
)

const readme = series(
  copyReadmeFiles("core/src", "components"), //
  copyReadmeFiles("core/docs", "components"),
  copyReadmeFiles("hooks/src", "hooks"),
  copyReadmeFiles("commerce/docs", "components"),
  copyReadmeFiles("commerce/src", "components"),
)

exports.buildWww = series(
  cleanBundle("www"),
  buildH5,
  readme,
  buildSite,
  copyGitIgnore(),
  copyH5(),
  copySite(),
)

exports.serve = parallel(serveDemo, serveSite)
