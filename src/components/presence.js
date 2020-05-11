import React from "react"
import { motion } from "framer-motion"
import cx from "classnames"
import styles from "./presence.module.css"

const Presence = ({ className, ...restProps }) => (
  <motion.div
    variants={{
      enter: {
        transition: {
          staggerChildren: 0.1,
        },
      },
      exit: {
        transition: {
          staggerChildren: 0.05,
          staggerDirection: -1,
        },
      },
    }}
    initial="exit"
    animate="enter"
    exit="exit"
    className={cx(styles.default, className)}
    {...restProps}
  />
)

export default Presence
