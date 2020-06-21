import { motion } from "framer-motion"
import React from "react"
import Presence from "../components/presence"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import styles from "./blog.module.css"

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
        <motion.h1 {...aniProps} className="mt-4">
          Bearjam Blog
        </motion.h1>

        <div className="">
          {posts
            .filter(({ node: post }) => post.excerpt.length > 20)
            .map(({ node: post }) => (
              <motion.div key={post.id} className="my-8" {...aniProps}>
                <Link to={post.fields.slug} className="text-2xl">
                  <h2>{post.frontmatter.title}</h2>
                </Link>
                <div className={styles.meta}>
                  <div>
                    <span>Author:</span>
                    <address>{post.frontmatter.author}</address>
                  </div>
                  <div>
                    <span>Date:</span>
                    <time>{post.frontmatter.date}</time>
                  </div>
                </div>
                <p>{post.excerpt}</p>
              </motion.div>
            ))}
        </div>
        <div className="py-20"></div>
      </div>
    </Presence>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query blogIndex {
    allMdx(
      filter: { fields: { collection: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 140)
          frontmatter {
            title
            date(formatString: "MMMM Do, YYYY")
            author
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
