import React from "react"
import Presence from "../components/Presence"
import styles from "../styles/post.module.css"
import cx from "classnames"
import { defaultPresenceProps } from "../animations"
import { motion } from "framer-motion"

export default function PostTemplate({ frontmatter, children }) {
  return (
    <Presence key="postTemplate" className={cx("px-2", styles.root)}>
      <motion.div {...defaultPresenceProps}>
        <h1>{frontmatter.title}</h1>
        <article>{children}</article>
      </motion.div>
    </Presence>
  )
}
