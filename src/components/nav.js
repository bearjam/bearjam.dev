import { useLocation } from "@reach/router"
import { motion } from "framer-motion"
import React from "react"
import { TextLink } from "./links"

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

const NavLink = ({ children, href, label, ...props }) => {
  const { pathname } = useLocation()
  const pathBeginning = `/${pathname.split("/")[1]}`
  const active = pathBeginning === href
  return children ? (
    children({ href, label, active, ...props })
  ) : (
    <TextLink to={href} {...props}>
      {label}
    </TextLink>
  )
}

const Nav = ({ children, ...props }) => {
  return (
    <motion.nav {...props}>
      {links.map(linkProps => (
        <NavLink key={linkProps.href} children={children} {...linkProps} />
      ))}
    </motion.nav>
  )
}

export default Nav
