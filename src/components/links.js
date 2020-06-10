import cx from "classnames"
import { Link } from "gatsby"
import React from "react"
import styles from "./links.module.css"
import { motion } from "framer-motion"

export const TextLink = ({ className, ...props }) => (
  <Link className={cx(styles.link, className)} {...props} />
)

export const Anchor = ({ href, children, ...props }) => (
  <a href={href} className={styles.anchor} {...props}>
    <motion.span>{children}</motion.span>
  </a>
)

export const ButtonLink = ({ className, variant = "primary", ...props }) => {
  return (
    <Link
      className={cx(styles.buttonLink, styles[variant], className)}
      {...props}
    />
  )
}
