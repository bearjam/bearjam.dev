import React from "react"
import "../styles/global.css"
import { MediaContext } from "../contexts"
import "typeface-corben"
import "typeface-inter"
import { AnimatePresence } from "framer-motion"
import useMedia from '../hooks/useMedia'
import Header from "./Header"
import Footer from "./Footer"

export default ({ children }) => {
  const screen = useMedia()
  return (
    <MediaContext.Provider value={screen}>
      <Header />
      <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
      <Footer />
    </MediaContext.Provider>
  )
}
