import { writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import * as sass from "sass"

const scriptsDirectory = dirname(fileURLToPath(import.meta.url))
const siteDirectory = resolve(scriptsDirectory, "..")
const source = resolve(siteDirectory, "theme/styles/taroify-core-source.scss")
const destination = resolve(siteDirectory, "theme/styles/taroify-core.css")

const result = sass.compile(source, {
  sourceMap: false,
  style: "expanded",
})

await writeFile(destination, `${result.css}\n`)
console.log("Compiled homepage component styles from packages/core/src.")
