import { motion } from "framer-motion"
import React, { useState } from "react"
import theme from "tailwindcss/defaultTheme"
import styles from "../styles/about-card.module.css"
import { SvgIconExpand } from "./svg"
import SocialLinks from "./SocialLinks"

const transition = {
  type: "spring",
  damping: 30,
  mass: 1.5,
}

const AboutCard = ({
  body,
  name,
  email,
  social,
  avatar: Avatar,
  className,
  fontSize = theme.fontSize.sm,
  lineHeight = theme.lineHeight.normal,
  excerptLines = 3,
  ...restProps
}) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)

  return (
    <div className={`${styles.root} ${className}`} {...restProps}>
      <div className={styles.cardAvatar}>
        <Avatar />
      </div>
      <motion.div
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={{
          open: {},
          closed: {},
        }}
        className={styles.cardMain}
      >
        <div className={styles.cardIdentity}>
          <div className={styles.cardNameEmail}>
            <h1>{name}</h1>
            <h3>{email}</h3>
          </div>
          <div className={styles.cardSocial}>
            <SocialLinks data={social}>
              {({ Icon, url }) => (
                <a href={url}>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <Icon />
                  </motion.div>
                </a>
              )}
            </SocialLinks>
          </div>
        </div>
        <motion.div className={styles.cardBody}>
          <svg>
            <defs>
              <linearGradient id={`${name}Grad`} x1="0" x2="0" y1="0" y2="1">
                <motion.stop
                  offset="0%"
                  stopColor={theme.colors.gray[500]}
                  stopOpacity="0"
                />
                <motion.stop
                  offset="40%"
                  stopColor={theme.colors.gray[500]}
                  variants={{
                    open: {
                      stopOpacity: 0,
                    },
                    closed: {
                      stopOpacity: 0.2,
                    },
                  }}
                  transition={transition}
                />
                <motion.stop
                  offset="80%"
                  stopColor={theme.colors.gray[500]}
                  variants={{
                    open: {
                      stopOpacity: 0,
                    },
                    closed: {
                      stopOpacity: 0.8,
                    },
                  }}
                  transition={transition}
                />
                <motion.stop
                  offset="100%"
                  stopColor={theme.colors.gray[500]}
                  variants={{
                    open: {
                      stopOpacity: 0,
                    },
                    closed: {
                      stopOpacity: 1,
                    },
                  }}
                />
              </linearGradient>
            </defs>

            <rect fill={`url(#${name}Grad)`} width="100%" height="100%" />
          </svg>
          <motion.p
            style={{
              fontSize,
              lineHeight,
            }}
            variants={{
              open: {
                height: "auto",
              },
              closed: {
                height: `calc(${fontSize} * ${excerptLines * lineHeight})`,
              },
            }}
            transition={transition}
            className={styles.mdBody}
          >
            {body}
          </motion.p>
          <motion.button onClick={toggleOpen}>
            <SvgIconExpand
              style={{
                originX: "50%",
                originY: "50%",
              }}
              initial="closed"
              variants={{
                open: {
                  rotate: 180,
                },
                closed: {
                  rotate: 0,
                },
              }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AboutCard
