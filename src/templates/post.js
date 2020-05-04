import React from "react"
import Presence from "../components/Presence"
import styles from "../styles/post.module.css"
import cx from "classnames"
import { defaultPresenceProps } from "../animations"
import { motion } from "framer-motion"

export default function PostTemplate({ frontmatter, children }) {
  const date = new Date(frontmatter.date).toUTCString().split(' ').slice(1,4).join(' ')

  return (
    <Presence key="postTemplate" className={cx("px-2", styles.root)}>
      <motion.div {...defaultPresenceProps}>
        <h1>{frontmatter.title}</h1>
        <time className="date">{date}</time>
        <article>{children}</article>
      </motion.div>
    </Presence>
  )
}
