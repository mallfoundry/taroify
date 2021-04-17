const fs = require("fs")
const rimraf = require("rimraf")
const gulp = require("gulp")
const { series } = require("gulp")

function cleanBundle(name) {
  const cleanTask = (cb) => {
    const bundlePath = `./bundles/${name}`
    const files = fs.readdirSync(bundlePath)
    if (files) {
      for (const file of files) {
        if (file !== "package.json") {
          rimraf.sync(`${bundlePath}/${file}`)
        }
      }
    }
    cb()
  }
  cleanTask.displayName = `clean bundle(${name}) files`
  return cleanTask
}

function initBundle(name) {
  const initPackageTask = (cb) => {
    const packageFile = fs.readFileSync(`./packages/${name}/package.json`, "utf8")
    const packageJson = JSON.parse(packageFile)
    packageJson.private = "false"
    if (packageJson.name) {
      packageJson.name = packageJson.name.replace("/~", "/")
    }
    fs.writeFileSync(`./bundles/${name}/package.json`, JSON.stringify(packageJson, null, 2), "utf8")
    cb()
  }
  initPackageTask.displayName = `init package.json to bundles/${name}`
  return initPackageTask
}

function buildBundle(name) {
  return series(cleanBundle(name), initBundle(name))
}

exports.buildBundle = buildBundle
