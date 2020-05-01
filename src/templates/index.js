import _ from "lodash"
import React from "react"
import AboutTemplate from "./about"
import HomeTemplate from "./home"

const templateComponents = {
  default: ({ children, ...props }) => <main {...props}>{children}</main>,
  about: AboutTemplate,
  home: HomeTemplate,
}

const TemplateIndex = ({ pageContext: { frontmatter }, children }) => {
  const templateKey = _.get(frontmatter, "templateKey", "default")
  const Template = templateComponents[templateKey]

  return <Template frontmatter={frontmatter}>{children}</Template>
}

export default TemplateIndex
