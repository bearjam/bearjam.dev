import React from "react"
import styles from "./demos.module.css"
import { motion } from "framer-motion"
import { useState } from "react"
import { useInterval } from "../../../hooks"
import theme from "tailwindcss/defaultTheme"
import { MenuToggle } from "./fm-menu-toggle"
import { AnimatePresence } from "framer-motion"

const Viewport = props => (
  <div className={styles.viewport}>
    <div {...props} />
  </div>
)

const Root = props => <motion.header className={styles.root} {...props} />

const Backdrop = props => <motion.div className={styles.backdrop} {...props} />

const Container = props => <div className={styles.container} {...props} />

export const Demo1 = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => void setOpen(p => !p)
  return (
    <Viewport>
      <Root animate={open ? "open" : "closed"} initial="closed">
        <Backdrop
          variants={{
            closed: {
              y: `calc(-100% + ${theme.spacing[12]})`,
            },
            open: {
              y: 0,
            },
          }}
          transition={{
            type: "spring",
            damping: 25,
            mass: 0.9,
            stiffness: 120,
          }}
        />
        <Container>
          <MenuToggle onClick={toggleOpen} />
        </Container>
      </Root>
    </Viewport>
  )
}

export const Demo2 = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => void setOpen(p => !p)
  return (
    <Viewport>
      <Root animate={open ? "open" : "closed"} initial="closed">
        <Backdrop
          variants={{
            closed: {
              x: `calc(-100% + ${theme.spacing[12]})`,
            },
            open: {
              x: 0,
            },
          }}
          transition={{
            type: "spring",
            damping: 25,
            mass: 0.9,
            stiffness: 120,
          }}
        />
        <Container className={styles.container2}>
          <MenuToggle onClick={toggleOpen} />
        </Container>
      </Root>
    </Viewport>
  )
}

const links = [
  { href: "/doe", label: "Doe" },
  { href: "/rae", label: "Rae" },
  { href: "/me", label: "Me" },
  { href: "/far", label: "Far" },
]

const Nav = props => {
  return <motion.nav {...props} />
}

export const Demo3 = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => void setOpen(p => !p)
  return (
    <Viewport>
      <Root animate={open ? "open" : "closed"} initial="closed">
        <Backdrop
          variants={{
            closed: {
              x: `calc(-100% + ${theme.spacing[12]})`,
            },
            open: {
              x: 0,
            },
          }}
          transition={{
            type: "spring",
            damping: 25,
            mass: 0.9,
            stiffness: 120,
          }}
        />
        <Container className={styles.container}>
          <MenuToggle onClick={toggleOpen} />
          <AnimatePresence>
            {open && (
              <Nav
                className={styles.navMobile}
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: {},
                  },
                }}
              />
            )}
          </AnimatePresence>
          {/* <Nav className={styles.navDesktop} /> */}
        </Container>
      </Root>
    </Viewport>
  )
}
