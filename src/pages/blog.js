import { motion } from "framer-motion"
import React from "react"
import Presence from "../components/Presence"
import { graphql, Link } from "gatsby"
import SEO from "../components/SEO"

const aniProps = {
  variants: {
    enter: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -50,
    },
  },
}

const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allMdx

  return (
    <Presence key="blogPage" className="px-2 mt-3">
      <SEO title="Blog" />
      <div className="max-w-2xl mx-auto">
        <motion.h1 {...aniProps} className="mt-4">Bearjam Blog</motion.h1>

        <div className="">
          {posts
            .filter(({ node: post }) => post.excerpt.length > 20)
            .map(({ node: post }) => (
              <motion.div key={post.id} className="mb-6" {...aniProps}>
                <Link to={post.fields.slug} className="text-2xl">
                  <h2>{post.frontmatter.title}</h2>
                </Link>
                <time className="date">{post.frontmatter.date}</time>
                <p>{post.excerpt}</p>
              </motion.div>
            ))}
        </div>
        <div className="py-20"></div>
      </div>
    </Presence>
  )
}

export const pageQuery = graphql`
  query blogIndex {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
