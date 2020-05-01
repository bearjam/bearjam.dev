import { motion } from "framer-motion"
import React from "react"
import Presence from "../components/Presence"
import { graphql, Link } from "gatsby"
import SEO from "../components/SEO"


const aniProps = {
  variants: {
    enter: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -50
    }
  }
}

const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allMdx

  return (
    <Presence key="blogPage">
      <SEO title="Blog" />
      <motion.h1 {...aniProps}>Awesome MDX Blog</motion.h1>

      <div>
        {posts
          .filter(({ node: post }) => post.excerpt.length > 20)
          .map(({ node: post }) => (
            <motion.div
              key={post.id}
              className="mb-6"
              {...aniProps}
            >
              <Link to={post.fields.slug}>
                <h2 className="text-2xl">{post.frontmatter.title}</h2>
              </Link>
              <time className="date">{post.frontmatter.date}</time>
              <p>{post.excerpt}</p>
            </motion.div>
          ))}
      </div>
    </Presence>
  )
}

export const pageQuery = graphql`
  query blogIndex {
    allMdx(
      sort: {
        fields: [frontmatter___date]
        order: DESC
      }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 140)
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default BlogIndex
