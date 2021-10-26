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

function createVanIconTsxFile(name) {
  const componentName = convertIconComponentName(name)
  const tsxContent = createVanIconTsxContent(componentName, name)
  writeFileSync(`./src/${componentName}.tsx`, tsxContent)
  appendFileSync(
    "./src/index.ts",
    `export { default as ${componentName} } from "./${componentName}"
`,
  )

  if (componentName === "Arrow") {
    appendFileSync(
      "./src/index.ts",
      `export { default as ArrowRight } from "./ArrowRight"
`,
    )
  }
}

truncateSync("./src/index.ts")

_.forEach(names.basic, createVanIconTsxFile)
_.forEach(names.outlined, createVanIconTsxFile)
_.forEach(names.filled, createVanIconTsxFile)
