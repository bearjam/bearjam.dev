import cx from "classnames"
import { motion } from "framer-motion"
import { graphql } from "gatsby"
import React from "react"
import { defaultPresenceProps } from "../animations"
import MDX, { defaultComponents } from "../components/mdx"
import Presence from "../components/presence"
import styles from "./post.module.css"
import getSlug from "speakingurl"
import "katex/dist/katex.min.css"

const components = {
  ...defaultComponents,
  h2: ({ children }) => {
    let identifier = getSlug(children)
    return (
      <a href={`#${identifier}`} className={styles.headerLink}>
        <h2 id={identifier}>
          <span>{children}</span>
          <span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
          </span>
        </h2>
      </a>
    )
  },
  h3: ({ children }) => {
    let identifier = getSlug(children)
    return (
      <a href={`#${identifier}`} className={styles.headerLink}>
        <h3 id={identifier}>
          <span>{children}</span>
          <span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
          </span>
        </h3>
      </a>
    )
  },
}

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
          <MDX components={components}>{body}</MDX>
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
