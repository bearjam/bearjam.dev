import cx from "classnames"
import { motion } from "framer-motion"
import React from "react"
import styles from "../styles/footer.module.css"
import { SvgBearjamAvatar, SvgBearjamTitle } from "./"
import { Link } from "./Link"
import Nav from "./Nav"
import SocialLinks from "./SocialLinks"

const socialLinks = [
  { site: "github", href: "https://github.com/bearjamdev" },
  { site: "twitter", href: "https://twitter.com/bearjamdev" },
  { site: "linkedin", href: "https://linkedin.com/in/bearjamdev" },
]
const defaultClassName =
  "py-10 flex flex-col items-center sm:relative sm:pt-12 sm:pb-4"

const Footer = ({ className, ...restProps }) => {
  return (
    <div className={styles.root} {...restProps}>
      <motion.footer
        className={cx(styles.footer, defaultClassName, className)}
        {...restProps}
      >
        <Nav className="flex flex-col text-center sm:flex-row">
          {({ href, label }) => (
            <Link
              className="mb-4 text-gray-100 sm:mb-0 sm:mx-8 lg:mx-12 sm:mt-8 sm:mb-3"
              key={href}
              to={href}
            >
              {label}
            </Link>
          )}
        </Nav>
        <hr className="border-gray-500 w-40 sm:w-full sm:max-w-2xl lg:max-w-4xl sm:my-3" />
        <div className="flex flex-col items-center sm:absolute sm:top-0 sm:mt-3">
          <SvgBearjamAvatar className="w-12 mt-4 sm:w-10" />
          <SvgBearjamTitle className="w-32 mt-4 sm:w-16" />
        </div>
        <div className="flex mt-4 sm:mt-0 sm:mb-3 sm:mt-3">
          <SocialLinks data={socialLinks}>
            {({ Icon, href }) => (
              <a href={href}>
                <Icon className="w-5 text-white fill-current mx-2" />
              </a>
            )}
          </SocialLinks>
        </div>
      </motion.footer>
    </div>
  )
}
export default Footer
