const path = require("path")
const _ = require("lodash")

const ComponentTemplate = path.resolve("./src/templates/component-template.tsx")
const DocumentTemplate = path.resolve("./src/templates/document-template.tsx")

function createComponentPage(edge, actions) {
  const { createPage } = actions
  createPage({
    path: `${edge.node.fields.slug}`,
    component: ComponentTemplate,
    context: {
      slug: edge.node.fields.slug,
    },
  })
}

function createDocumentPage(edge, actions) {
  const { createPage } = actions
  createPage({
    path: `${edge.node.fields.slug}`,
    component: DocumentTemplate,
    context: {
      slug: edge.node.fields.slug,
    },
  })
}

module.exports = async ({ graphql, actions }) => {
  const result = await graphql(`{
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }`)

  result.data.allMarkdownRemark.edges.forEach(edge => {
    const { slug } = edge.node.fields
    if (_.startsWith(slug, "/components")) {
      createComponentPage(edge, actions)
    } else {
      createDocumentPage(edge, actions)
    }
  })
}
