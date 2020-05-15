import cx from "classnames"
import React from "react"
import styles from "./inputs.module.css"
import { forwardRef } from "react"

export const Input = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cx(
        { [styles.input]: type !== "submit" },
        styles[type],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

export const TextArea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cx(styles.input, styles.textarea, className)}
      ref={ref}
      {...props}
    />
  )
})
