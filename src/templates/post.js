import cx from "classnames"
import { motion } from "framer-motion"
import { graphql } from "gatsby"
import React from "react"
import { defaultPresenceProps } from "../animations"
import MDX from "../components/mdx"
import Presence from "../components/presence"
import styles from "./post.module.css"

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
          <MDX>{body}</MDX>
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
