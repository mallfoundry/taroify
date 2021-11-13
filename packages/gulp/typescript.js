const gulp = require("gulp")
const { series, watch } = require("gulp")
const sourcemaps = require("gulp-sourcemaps")
const ts = require("gulp-typescript")
const babel = require("gulp-babel")

const ignore = ["node_modules", "**/__tests__", "**/?(*.)+(spec|test).[tj]s?(x)"]

function copyTypescriptFiles(bundle, dist) {
  const copyTypescriptFilesTask = () =>
    gulp
      .src([`./packages/${bundle}/src/**/*.[jt]s?(x)`], {
        ignore,
      })
      .pipe(gulp.dest(`./bundles/${dist ?? bundle}`))
  copyTypescriptFilesTask.displayName = `copy typescript files to bundles/${
    dist ?? bundle
  } from packages/${bundle}`
  return copyTypescriptFilesTask
}

function copyDeclarationFiles(bundle, dist) {
  const copyDeclarationFilesTask = () =>
    gulp
      .src([`./packages/${bundle}/src/**/*.d.ts`], {
        ignore,
      })
      .pipe(gulp.dest(`./bundles/${dist ?? bundle}`))
  copyDeclarationFilesTask.displayName = `copy typescript declaration files to bundles/${
    dist ?? bundle
  } from packages/${bundle}`
  return copyDeclarationFilesTask
}

function symlinkTypescriptFiles(bundle, dist) {
  const symlinkTypescriptFilesTask = () =>
    gulp
      .src([`./packages/${bundle}/src/**/*.[jt]s?(x)`], {
        ignore,
      })
      .pipe(gulp.symlink(`./bundles/${dist ?? bundle}`))
  symlinkTypescriptFilesTask.displayName = `symlink typescript files to bundles/${
    dist ?? bundle
  } from packages/${bundle}`
  return symlinkTypescriptFilesTask
}

function compileTypescript(bundle, dist) {
  const tsProject = ts.createProject("tsconfig.json", {
    noImplicitAny: false,
    declaration: false,
    declarationMap: false,
    allowJs: true,
  })
  const compileTypescriptTask = () =>
    gulp
      .src([`./packages/${bundle}/src/**/*.[jt]s?(x)`], {
        ignore,
      })
      .pipe(sourcemaps.init())
      .pipe(tsProject())
      .pipe(babel())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(`./bundles/${dist ?? bundle}`))
  compileTypescriptTask.displayName = `compile typescript files to bundles/${
    dist ?? bundle
  } from packages/${bundle}`
  return compileTypescriptTask
}

function generateDeclarationFiles(bundle, dist) {
  const dtsProject = ts.createProject("tsconfig.d.json")
  const generateTypescriptDeclarationTask = () =>
    gulp
      .src([`./packages/${bundle}/src/**/*.[t]s?(x)`], {
        ignore,
      })
      .pipe(dtsProject())
      .pipe(gulp.dest(`./bundles/${dist ?? bundle}`))
  generateTypescriptDeclarationTask.displayName = `generate typescript declaration files to bundles/${
    dist ?? bundle
  } from packages/${bundle}`
  return generateTypescriptDeclarationTask
}

function buildTypescript(module, dist) {
  return series(
    //
    // copyTypescriptFiles(module, dist), //
    copyDeclarationFiles(module, dist), //
    compileTypescript(module, dist), //
    generateDeclarationFiles(module, dist), //
  )
}

function watchTypescript(module, dist) {
  watch(
    [`./packages/${module}/src/**/*.[jt]s?(x)`],
    {
      // events: "all",
      ignoreInitial: false,
    },
    series(
      //
      copyTypescriptFiles(module, dist), //
      compileTypescript(module, dist), //
      generateDeclarationFiles(module, dist),
    ), //
  )
}

function watchTypescriptSymlink(module, dist) {
  watch(
    [`./packages/${module}/src/**/*.[jt]s?(x)`],
    {
      events: ["add", "addDir", "unlink", "unlinkDir"],
      ignoreInitial: false,
    },
    series(symlinkTypescriptFiles(module, dist)),
  )
}

exports.buildTypescript = buildTypescript
exports.watchTypescript = watchTypescript
exports.watchTypescriptSymlink = watchTypescriptSymlink
