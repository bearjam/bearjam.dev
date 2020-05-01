import { useMatch } from "@reach/router"
import { motion } from "framer-motion"
import React from "react"
import { Link } from "./Link"

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

const NavLink = ({ children, href, label, ...props }) => {
  const active = useMatch(href)
  return children ? (
    children({ href, label, active, ...props })
  ) : (
    <Link to={href} {...props}>
      {label}
    </Link>
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
