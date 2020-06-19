import React from "react"
import Presence from "../components/presence"
import { defaultPresenceProps } from "../animations"
import { motion } from "framer-motion"

const ThankYouForSubscribing = () => {
  return (
    <Presence key="thankYouForSubscribingPage" className="px-2">
      <div className="text-center pt-8">
        <motion.h1 {...defaultPresenceProps}>
          Thank You for Subscribing!
        </motion.h1>
        <motion.p {...defaultPresenceProps}>We'll be in touch soon!</motion.p>
      </div>
    </Presence>
  )
}

export default ThankYouForSubscribing
