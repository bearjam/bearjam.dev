import React from "react"
import "./layout.css"
import "typeface-corben"
import "typeface-inter"
import { AnimatePresence } from "framer-motion"
import { useMedia, MediaContext } from "../hooks"
import Header from "./header"
import Footer from "./footer"

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
