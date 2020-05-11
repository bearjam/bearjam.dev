import { motion } from "framer-motion"
import { Link as GatsbyLink } from "gatsby"
import React, { forwardRef } from "react"
import cx from 'classnames'

export const MotionLink = motion.custom(
  forwardRef((props, ref) => <Link innerRef={ref} {...props} />)
)

export const Link = ({ className, ...props }) => (
  <GatsbyLink className={cx(`link`, className)} {...props} />
)
