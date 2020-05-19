import React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"

const Foo = props => (
  <motion.div
    animate="animate"
    exit="exit"
    initial="exit"
    variants={{ animate: { opacity: 1 }, exit: { opacity: 0 } }}
    {...props}
  />
)

const TestAPIPage = () => {
  const [foo, setFoo] = useState(false)
  const toggle = () => setFoo(!foo)
  const { register, handleSubmit } = useForm({ mode: "onSubmit" })
  const onSubmit = async data => {
    try {
      const res = await fetch("/api/bar")
      console.log("res", res)
    } catch (err) {
      console.log("err", err)
    }
  }
  return (
    <div className="pt-16">
      <AnimatePresence exitBeforeEnter className="pt-16">
        <motion.form onSubmit={handleSubmit(onSubmit)}>
          <input type="email" />
          <input type="submit" />
        </motion.form>
      </AnimatePresence>
    </div>
  )
}

export default TestAPIPage
