import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MotionLink } from "./link"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styles from "./mdx.module.css"

const components = {
  a: props => (
    <MotionLink
      whileHover={{ scale: 1.02 }}
      className={styles.link}
      {...props}
    />
  ),
}

const shortcodes = {}

const MDX = ({ children, ...props }) => {
  return (
    <MDXProvider components={components} shortcodes={shortcodes} {...props}>
      <MDXRenderer>{children}</MDXRenderer>
    </MDXProvider>
  )
}

export default MDX
