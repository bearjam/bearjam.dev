import cx from "classnames"
import { motion } from "framer-motion"
import React from "react"
import styles from "./double-sided.module.css"

const DoubleSided = ({ className, ...props }) => {
  if (props.children.length !== 2)
    throw Error("DoubleSided component takes exactly 2 child elements")

  return (
    <div className={styles.scene}>
      <motion.div className={cx(styles.wrapper, className)} {...props} />
    </div>
  )
}

export default DoubleSided
