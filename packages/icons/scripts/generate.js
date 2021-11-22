const { writeFileSync, appendFileSync, truncateSync } = require("fs")
const _ = require("lodash")
const names = require("../src/van/names")

function convertIconComponentName(name) {
  const isOutline = _.endsWith(name, "-o")
  name = isOutline ? name.substring(0, _.size(name) - 2) + "-outlined" : name
  return _.upperFirst(_.camelCase(name))
}

function createVanIconTsxContent(componentName, name) {
  return `import { createVanIconComponent } from "./van"

const ${componentName} = createVanIconComponent("${name}")
export default ${componentName}
`
}

function createVanIconTsxFile(componentName, name) {
  const tsxContent = createVanIconTsxContent(componentName, name)
  writeFileSync(`./src/${componentName}.tsx`, tsxContent)
  appendFileSync(
    "./src/index.ts",
    `export { default as ${componentName} } from "./${componentName}"
`,
  )
}

function createIconTsxFile(name) {
  const componentName = convertIconComponentName(name)
  createVanIconTsxFile(componentName, name)
  if (componentName === "Arrow") {
    createVanIconTsxFile("ArrowRight", "arrow")
  }
}

truncateSync("./src/index.ts")

_.forEach(names.basic, createIconTsxFile)
_.forEach(names.outlined, createIconTsxFile)
_.forEach(names.filled, createIconTsxFile)
