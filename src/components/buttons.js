import React from "react"
import styles from "./buttons.module.css"
import { Link } from "gatsby"
import cx from "classnames"

export const ButtonLink = ({ className, variant = "primary", ...props }) => {
  return (
    <Link
      className={cx(styles.buttonLink, styles[variant], className)}
      {...props}
    />
  )
}

export const Submit = ({
  children,
  className,
  variant = "primary",
  ...props
}) => {
  return (
    <input
      type="submit"
      variant={variant}
      value={children}
      className={cx(styles.buttonLink, styles[variant], className)}
      {...props}
    />
  )
}
