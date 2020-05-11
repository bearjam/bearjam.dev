import React from "react"
import { MDXProvider } from "@mdx-js/react"

const components = {}

const shortcodes = {}

const MDX = ({ children, ...props }) => {
  return (
    <MDXProvider components={components} shortcodes={shortcodes} {...props}>
      {children}
    </MDXProvider>
  )
}

export default MDX
