import React from "react"
import Presence from "../components/presence"
import styles from "./post.module.css"
import cx from "classnames"
import { defaultPresenceProps } from "../animations"
import { motion } from "framer-motion"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default function PostTemplate({ data }) {
  const {
    frontmatter: { title, date },
    body,
  } = data.mdx

  return (
    <Presence key="postTemplate" className={cx("px-2", styles.root)}>
      <motion.div {...defaultPresenceProps}>
        <h1>{title}</h1>
        <time className="date">{date}</time>
        <article>
          <MDXRenderer>{body}</MDXRenderer>
        </article>
      </motion.div>
    </Presence>
  )
}

export const query = graphql`
  query PostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`
