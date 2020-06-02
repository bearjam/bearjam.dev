import React from "react"
import styles from "./demos.module.css"
import { motion } from "framer-motion"
import { useState } from "react"
import { useInterval } from "../../../hooks"
import theme from "tailwindcss/defaultTheme"
import { MenuToggle } from "./fm-menu-toggle"

function Viewport(props) {
  return <div className={styles.viewport} {...props} />
}

function Header({ children, ...props }) {
  return (
    <motion.header className={styles.header} {...props}>
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
        transition={{
          type: "spring",
          damping: 25,
          mass: 0.9,
          stiffness: 120,
        }}
      >{`Backdrop`}</motion.div>

      <div className={styles.container}>{children}</div>
    </motion.header>
  )
}

export function Step1Demo1() {
  const [open, setOpen] = useState(false)
  useInterval(() => {
    setOpen(prev => !prev)
    console.log(open)
  }, 2000)
  return (
    <Viewport>
      <Header animate={open ? "open" : "closed"}>{`Container`}</Header>
    </Viewport>
  )
}

export function Step1Demo2() {
  const [open, setOpen] = useState(false)
  useInterval(() => {
    setOpen(prev => !prev)
    console.log(open)
  }, 2000)
  return (
    <Viewport>
      <motion.aside className={styles.aside} animate={open ? "open" : "closed"}>
        <motion.div
          className={styles.backdrop}
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
        >{`Backdrop`}</motion.div>
        <div className={styles.container}>{`Container`}</div>
      </motion.aside>
    </Viewport>
  )
}

export function Step2Demo1() {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => void setOpen(!open)
  return (
    <Viewport>
      <Header animate={open ? "open" : "closed"} initial="closed">
        <MenuToggle onClick={toggleOpen} />
      </Header>
    </Viewport>
  )
}
