import React from "react"
import AboutCard from "../components/AboutCard"
import Presence from "../components/Presence"
import { SvgMagAvatar, SvgTomAvatar } from "../components/svg"
import { slalom } from "../animations"

const avatars = {
  Magda: SvgMagAvatar,
  Tom: SvgTomAvatar,
}

const AboutTemplate = ({ frontmatter, children }) => {
  return (
    <Presence key="aboutPage" className="px-2">
      {frontmatter.cards.map(({ name, ...rest }, i) => (
        <AboutCard key={name} name={name} avatar={avatars[name]} variants={slalom(i)} {...rest} />
      ))}
    </Presence>
  )
}

export default AboutTemplate
