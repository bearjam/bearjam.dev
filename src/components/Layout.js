import React from "react"
import "../styles/global.css"
import { MediaContext } from "../contexts"
import "typeface-corben"
import "typeface-inter"
import { AnimatePresence } from "framer-motion"
import useMedia from "../hooks/useMedia"
import Header from "./Header"
import Footer from "./Footer"

export default ({ children }) => {
  const screen = useMedia()
  return (
    <MediaContext.Provider value={screen}>
      <Header />
      <div className="flex flex-col h-full">
        <main className="flex-grow flex-shrink-0">
          <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
        </main>
        <Footer />
      </div>
    </MediaContext.Provider>
  )
}
