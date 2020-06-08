import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { TextLink, Anchor } from "./links"

const components = {
  a: ({ href, ...props }) => {
    const internal = /^\.?\/(?!\/)/.test(href)

    return internal ? (
      <TextLink to={href} {...props} />
    ) : (
      <Anchor href={href} {...props} />
    )
  },
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
