import * as fs from "fs"
import rimraf from "rimraf"

function cleanBundle(name) {
  const basepath = `./bundles/${name}`
  const files = fs.readdirSync(basepath)
  if (files) {
    for (const file of files) {
      if (file !== "package.json") {
        rimraf.sync(`${basepath}/${file}`)
      }
    }
  }
}

cleanBundle("core")
cleanBundle("icons")
