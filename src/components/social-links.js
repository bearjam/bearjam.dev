import React, { Fragment } from "react"
import {
  SvgIconGitHub,
  SvgIconInstagram,
  SvgIconLinkedIn,
  SvgIconTwitter,
} from "./icons"

const icons = {
  twitter: SvgIconTwitter,
  github: SvgIconGitHub,
  instagram: SvgIconInstagram,
  linkedin: SvgIconLinkedIn,
}

const SocialLinks = ({ children, data }) => {
  return (
    <>
      {data.map(({ site, ...rest }) => (
        <Fragment key={site}>
          {children({ site, Icon: icons[site], ...rest })}
        </Fragment>
      ))}
    </>
  )
}

export default SocialLinks
