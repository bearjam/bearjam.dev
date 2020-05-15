import cx from "classnames"
import React from "react"
import styles from "./inputs.module.css"

const upperCaseFirst = s => [[...s][0].toUpperCase(), ...s.slice(1)].join("")

export const Input = ({ className, type, variant = "primary", ...props }) => {
  return (
    <input
      type={type}
      className={cx(styles[type + upperCaseFirst(variant)], className)}
      {...props}
    />
  )
}

export const TextArea = ({ className, variant = "primary", ...props }) => {
  return (
    <textarea
      className={cx(styles[`textarea${upperCaseFirst(variant)}`], className)}
      {...props}
    />
  )
}
