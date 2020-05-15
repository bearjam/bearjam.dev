import cx from "classnames"
import React from "react"
import styles from "./inputs.module.css"

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
