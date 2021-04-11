const path = require("path")
const _ = require("lodash")

const DocumentTemplate = path.resolve("./src/templates/document-template.tsx")

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
  const { createRedirect } = actions

  createRedirect({
    fromPath: "/",
    toPath: "/introduce/",
    isPermanent: true,
    redirectInBrowser: true,
  })

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
    createDocumentPage(edge, actions)
  })
}
