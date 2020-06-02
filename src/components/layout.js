import { AnimatePresence } from "framer-motion"
import React from "react"
import "typeface-corben"
import "typeface-inter"
import Footer from "./footer"
import Header from "./header"
import "./layout.css"

export default ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col h-full">
        <main className="flex-grow flex-shrink-0">
          <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  )
}
