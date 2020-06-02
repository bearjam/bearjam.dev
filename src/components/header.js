import { AnimateSharedLayout, motion, useCycle } from "framer-motion"
import { Link } from "gatsby"
import React from "react"
import theme from "tailwindcss/defaultTheme"
import { SvgBearjamAvatar, SvgBearjamTitle } from "./art"
import styles from "./header.module.css"
import { TextLink } from "./links"
import Menu from "./menu"
import Nav from "./nav"

const Header = () => {
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
        <Menu
          className={styles.menu}
          onClick={cycleOpen}
          open={open === "open"}
        />
        {open === "open" && (
          <Nav
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
          >
            {({ href, label, active }) => (
              <motion.div
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
                  data-active={active}
                >
                  {label}
                </TextLink>
              </motion.div>
            )}
          </Nav>
        )}
        <AnimateSharedLayout>
          <Nav className={styles.navSm}>
            {({ href, label, active }) => (
              <TextLink to={href}>
                <span>{label}</span>
                {active && <motion.div layoutId="underline" />}
              </TextLink>
            )}
          </Nav>
        </AnimateSharedLayout>
      </div>
    </motion.header>
  )
}

export default Header
