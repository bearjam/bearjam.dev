import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { Input } from "../components/inputs"

const Motion = props => (
  <motion.div
    animate="animate"
    initial="initial"
    exit="initial"
    variants={{ animate: { opacity: 1 }, initial: { opacity: 0 } }}
    {...props}
  />
)

const TestAPIPage = () => {
  const { register, handleSubmit } = useForm({ mode: "onSubmit" })
  const [state, setState] = useState("initial")
  const onSubmit = async data => {
    setState("pending")
    return await fetch("/api/bar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (res.ok) {
          setState("success")
        } else {
          throw Error(res.status)
        }
      })
      .catch(err => {
        console.log("err", err)
        setState("error")
      })
  }

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <div className="pt-16 px-4">
      <AnimatePresence exitBeforeEnter>
        {state === "initial" || state === "error" ? (
          <Motion key="form" transition={{ staggerChildren: 0.5 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Motion key="inputEmail">
                <Input type="email" name="email" ref={register} />
              </Motion>
              <Motion key="inputSubmit">
                <Input type="submit" className="px-4 py-2 mt-2" />
              </Motion>
            </form>
          </Motion>
        ) : state === "pending" ? (
          <Motion key="pending">
            <p>Pending</p>
          </Motion>
        ) : state === "success" ? (
          <Motion key="success">
            <p>Success</p>
          </Motion>
        ) : (
          <Motion key="wtf">
            <p>This shouldn't be</p>
          </Motion>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TestAPIPage
