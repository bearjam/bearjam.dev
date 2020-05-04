/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, actions, getNode }) => {

  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const sourceDir = getNode(node.parent).sourceInstanceName
    const filePath = createFilePath({ node, getNode })
    const slug = '/' + sourceDir + filePath
    createNodeField({
      name: 'slug',
      node,
      value: slug
    })
  }
}

// exports.createPages = async ({ graphql, actions, reporter }) => {
//   // Destructure the createPage function from the actions object
//   const { createPage } = actions
//   const result = await graphql(`
//     query {
//       allMdx {
//         edges {
//           node {
//             id
//             fields {
//               slug
//             }
//             frontmatter {
//               templateKey
//             }
//           }
//         }
//       }
//     }
//   `)
//   if (result.errors) {
//     reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
//   }
//   // Create blog post pages.
//   const posts = result.data.allMdx.edges
//   // you'll call `createPage` for each result
//   posts.forEach(({ node }) => {
//     console.log(node.fields.slug)
//     createPage({
//       // This is the slug you created before
//       // (or `node.frontmatter.slug`)
//       path: node.fields.slug,
//       // This component will wrap our MDX content
//       component: path.resolve(`./src/templates/index.js`),
//       // You can use the values in this context in
//       // our page layout component
//       context: { id: node.id },
//     })
//   })
// }
