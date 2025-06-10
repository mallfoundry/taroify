// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const path = require("path")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const gulp = require("gulp")
const { watch, series } = require("gulp")
const postcss = require("gulp-postcss")
const sass = require("gulp-sass")(require("sass"))

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

function addScssFileExtname(id) {
  return path.extname(id) === "scss" ? id : `${id}.scss`
}

function getScssPartialBasename(basename) {
  return `_${basename}`
}

function resolveNpmPath(id) {
  try {
    return require.resolve(addScssFileExtname(id))
  } catch (e) {
    const dirname = path.dirname(id)
    const basename = path.basename(id)
    const partialBasename = getScssPartialBasename(basename)
    const partialFilename = addScssFileExtname(partialBasename)
    const partialFilepath = path.join(dirname, partialFilename)
    return require.resolve(partialFilepath)
  }
}

function npmModule(url, file, done) {
  if (!url.startsWith("~")) {
    return done({ file: url })
  }
  // Remove ~ character
  const urlWithoutTilde = url.substring(1)
  try {
    const toPath = resolveNpmPath(urlWithoutTilde)
    return done({ file: toPath })
  } catch (e) {
    return done({ file: urlWithoutTilde })
  }
}

function compileScss(bundle, dist) {
  const plugins = [
    autoprefixer(),
    cssnano({
      preset: [
        "default",
        {
          calc: false,
        },
      ],
    }),
  ]

  const compileScssTask = () =>
    gulp
      .src(`./packages/${bundle}/src/**/index.scss`)
      .pipe(
        sass({
          importers: [
            {
              findFileUrl(url) {
                if (!url.startsWith("~@taroify/core")) return null
                const relativeUrl = url.substring(15)
                const realUrl = path.join(__dirname, "../core/src", relativeUrl)
                const dirname = path.dirname(realUrl)
                const basename = path.basename(realUrl)
                const partialBasename = getScssPartialBasename(basename)
                const partialFilename = addScssFileExtname(partialBasename)
                const partialFilepath = path.join(dirname, partialFilename)
                return new URL(`file://${partialFilepath}`)
              },
            },
          ],
          style: "compressed",
        }).on("error", sass.logError),
      )
      .pipe(postcss(plugins))
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
    series(copyScssFiles(module), compileScss(module)),
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
