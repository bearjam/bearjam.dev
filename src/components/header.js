import cx from "classnames"
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  useCycle,
} from "framer-motion"
import { Link } from "gatsby"
import React, { Fragment, useContext } from "react"
import theme from "tailwindcss/defaultTheme"
import { MediaContext } from "../hooks"
import { SvgBearjamAvatar, SvgBearjamTitle } from "./art"
import styles from "./header.module.css"
import { TextLink } from "./links"
import Menu from "./menu"
import Nav from "./nav"

const Header = () => {
  const screen = useContext(MediaContext)
  const [open, cycleOpen] = useCycle("closed", "open")

  return (
    <motion.header
      initial="closed"
      animate={open}
      variants={{
        open: {
          transition: {
            staggerChildren: 0.2,
          },
        },
        closed: {
          transition: {
            staggerChildren: 0.7,
            staggerDirection: -1,
          },
        },
      }}
    >
      <motion.div
        className={styles.backdrop}
        variants={{
          closed: {
            y: `calc(-100% + ${theme.spacing[12]})`,
          },
          open: {
            y: 0,
          },
        }}
        transition={{ type: "spring", damping: 25, mass: 0.9, stiffness: 120 }}
      />
      <div className={styles.container}>
        <div className={styles.banner}>
          <Link to="/" onClick={() => cycleOpen(0)}>
            <SvgBearjamAvatar />
            <SvgBearjamTitle />
          </Link>
        </div>
        <AnimatePresence exitBeforeEnter>
          {screen < 1 ? (
            <Fragment key="navXsFragment">
              <motion.button
                key="menu"
                className={styles.menu}
                onClick={cycleOpen}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
              >
                <Menu open={open === "open"} className={styles.menu} />
              </motion.button>
              {open === "open" && (
                <Nav
                  key="navXsNav"
                  className={styles.navXs}
                  variants={{
                    open: {
                      transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.4,
                      },
                    },
                    closed: {
                      transition: {
                        staggerChildren: 0.2,
                        staggerDirection: -1,
                      },
                    },
                  }}
                  exit={{ opacity: 0 }}
                >
                  {({ href, label, active }) => (
                    <motion.div
                      className={cx(
                        {
                          "text-pink-400": active,
                        },
                        `mb-5`
                      )}
                      variants={{
                        closed: {
                          opacity: 0,
                        },
                        open: {
                          opacity: 1,
                        },
                      }}
                    >
                      <TextLink
                        to={href}
                        tabIndex={open === "open" ? 0 : -1}
                        onClick={() => cycleOpen(0)}
                      >
                        {label}
                      </TextLink>
                    </motion.div>
                  )}
                </Nav>
              )}
            </Fragment>
          ) : (
            <AnimateSharedLayout>
              <Nav
                className={styles.navSm}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key="navSm"
              >
                {({ href, label, active }) => (
                  <TextLink to={href} className={styles.smLink}>
                    <span>{label}</span>
                    {active && (
                      <motion.div
                        layoutId="underline"
                        className={styles.smActiveUnderline}
                      />
                    )}
                  </TextLink>
                )}
              </Nav>
            </AnimateSharedLayout>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header
