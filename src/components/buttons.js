import React from "react"
import styles from "./buttons.module.css"
import { Link } from "gatsby"
import cx from "classnames"

export const ButtonLink = ({ className, type = "primary", ...props }) => {
  return (
    <Link
      className={cx(styles.buttonLink, styles[type], className)}
      {...props}
    />
  )
}
