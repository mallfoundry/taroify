const acron = require("acorn")
const walk = require("acorn-walk")
const MagicString = require("magic-string")

function treeShakingLodash(content) {
  if (!content.includes("lodash")) {
    return content
  }
  const ast = acron.parse(content, { ecmaVersion: "latest", sourceType: "module" });
  const importNamespaceSpecifierMap = new Map()
  const magicString = new MagicString(content);
  walk.simple(ast, {
    ImportDeclaration(node) {
      if (node.source.value === "lodash") {
        const map = new Map();
        node.specifiers.forEach((specifier) => {
          if (specifier.type === "ImportNamespaceSpecifier" || specifier.type === "ImportDefaultSpecifier") {
            if (importNamespaceSpecifierMap.has(specifier.local.name)) {
              magicString.remove(node.start, node.end)
            } else {
              importNamespaceSpecifierMap.set(specifier.local.name, {
                start: node.start,
                end: node.end,
                importedSet: new Set()
              })
            }
          } else if (specifier.type === "ImportSpecifier") {
            map.set(specifier.imported.name, specifier.local.name);
          }
        })
        if (map.size > 0) {
          magicString.overwrite(node.start, node.end, Array.from(map.entries()).map(([key, value]) => `import ${value} from "lodash/${key}";`).join("\n"));
        }
      }
      // lodash/fp
    }
  })
  if (importNamespaceSpecifierMap.size > 0) {
    const importNamespaceSpecifierNames = Array.from(importNamespaceSpecifierMap.keys())
    walk.simple(ast, {
      MemberExpression(node) {
        if (node.type === "MemberExpression" && node.object.type === "Identifier") {
          const name = node.object.name;
          if (importNamespaceSpecifierNames.includes(name)) {
            const { importedSet } = importNamespaceSpecifierMap.get(name)
            importedSet.add(node.property.name)
            magicString.overwrite(node.start, node.end, `${name}${node.property.name}`);
          }
        }
      },
    })
    importNamespaceSpecifierMap.forEach(({ start, end, importedSet }, key) => {
      if (importedSet.size > 0) {
        magicString.overwrite(start, end, Array.from(importedSet).map(name => `import ${key}${name} from "lodash/${name}";`).join("\n"));
      } else {
        magicString.remove(start, end)
      }
    })
  }
  return magicString.toString()
}

exports.treeShakingLodash = treeShakingLodash
