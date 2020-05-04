import React from "react"
import AboutTemplate from "./about"
import HomeTemplate from "./home"

const templateComponents = {
  default: ({ children, ...props }) => <main {...props}>{children}</main>,
  about: AboutTemplate,
  home: HomeTemplate,
}

const TemplateIndex = ({ pageContext: { frontmatter }, children }) => {
  const Template = templateComponents[frontmatter?.templateKey || "default"]

  return <Template frontmatter={frontmatter}>{children}</Template>
}

export default TemplateIndex
