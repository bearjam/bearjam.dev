import React from "react"
import AboutCard from "../components/AboutCard"
import Presence from "../components/Presence"
import { SvgMagAvatar, SvgTomAvatar } from "../components/svg"

const avatars = {
  Magda: SvgMagAvatar,
  Tom: SvgTomAvatar,
}

const AboutTemplate = ({ frontmatter, children }) => {
  return (
    <Presence>
      {frontmatter.cards.map(({ name, ...rest }) => (
        <AboutCard key={name} name={name} avatar={avatars[name]} {...rest} />
      ))}
    </Presence>
  )
}

export default AboutTemplate
