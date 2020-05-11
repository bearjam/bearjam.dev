import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { slalom } from "../animations"
import AboutCard from "../components/about-card"
import Presence from "../components/presence"
import { SvgMagAvatar, SvgTomAvatar } from "../components/art"

const avatars = {
  Magda: SvgMagAvatar,
  Tom: SvgTomAvatar,
}

const AboutTemplate = ({ data }) => {
  const { frontmatter } = data.mdx

  return (
    <Presence key="aboutPage" className="px-2">
      {frontmatter.cards.map(({ name, ...rest }, i) => (
        <AboutCard
          key={name}
          name={name}
          avatar={avatars[name]}
          variants={slalom(i)}
          {...rest}
        />
      ))}
    </Presence>
  )
}

export default AboutTemplate

export const query = graphql`
  query AboutQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        cards {
          name
          email
          body
          social {
            site
            url
          }
        }
      }
    }
  }
`
