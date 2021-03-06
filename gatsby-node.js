const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const collection = getNode(node.parent).sourceInstanceName

    createNodeField({
      name: "collection",
      node,
      value: collection,
    })

    let slug = node.frontmatter.slug
      ? `/${node.frontmatter.slug}`
      : createFilePath({ node, getNode })

    switch (collection) {
      case "pages":
        break
      default:
        slug = `/${collection}${slug}`
        break
    }

    createNodeField({
      name: "slug",
      node,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  const posts = result.data.allMdx.edges

  posts.forEach(({ node }, index) => {
    const templateKey = node.frontmatter.templateKey || `post`
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/${templateKey}.js`),
      context: { id: node.id },
    })
  })
}

exports.createSchemaCustomization = ({
  actions: { createTypes, createFieldExtension },
  createContentDigest,
}) => {
  createFieldExtension({
    name: "mdx",
    extend() {
      return {
        type: "String",
        resolve(source, args, context, info) {
          // Grab field
          const value = source[info.fieldName]
          // Isolate MDX
          const mdxType = info.schema.getType("Mdx")
          // Grab just the body contents of what MDX generates
          const { resolve } = mdxType.getFields().body
          return resolve({
            rawBody: value,
            internal: {
              contentDigest: createContentDigest(value), // Used for caching
            },
          })
        },
      }
    },
  })
  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      templateKey: String
      slug: String
      whatWeDo: WhatWeDo
    }
    type WhatWeDo {
      heading: String!
      blurbs: [Blurb]
    }
    type Blurb {
      heading: String!
      blurb: String! @mdx
    }
  `)
}
