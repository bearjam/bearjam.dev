import React from "react"
import AboutTemplate from "./about"
import HomeTemplate from "./home"
import PostTemplate from "./post"

const templateComponents = {
  default: PostTemplate,
  about: AboutTemplate,
  home: HomeTemplate,
}

const TemplateIndex = ({ pageContext: { frontmatter }, children }) => {
  const Template = templateComponents[frontmatter?.templateKey || "default"]
  return <Template frontmatter={frontmatter}>{children}</Template>
}

export default TemplateIndex
