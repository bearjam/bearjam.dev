import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { defaultPresenceProps } from "../animations"
import { SvgIconWarning } from "./icons"
import { Input } from "./inputs"
import styles from "./mail-sub.module.css"

const MailSub = ({ frontmatter }) => {
  const { register, handleSubmit, errors, setError } = useForm({
    mode: "onSubmit",
  })
  const [state, setState] = useState("initial")

  const onSubmit = async data => {
    setState("submitted")
    try {
      await fetch("/api/mailing-list/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    } catch (err) {
      setState("initial")
      setError("email", null, "Error, please try again")
    }
  }

  return (
    <section className={styles.root}>
      <div>
        <AnimatePresence exitBeforeEnter>
          <div>
            <h1>{frontmatter.mailSub.heading}</h1>
            {state === "initial" && (
              <motion.p key="blurb" {...defaultPresenceProps}>
                {frontmatter.mailSub.blurb}
              </motion.p>
            )}
          </div>
          {state === "initial" ? (
            <form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              {...defaultPresenceProps}
            >
              <Input
                type="email"
                placeholder="E-mail address"
                id="email"
                name="email"
                aria-invalid={errors?.email ? "true" : "false"}
                aria-describedby="emailError"
                ref={register({
                  required: true,
                })}
              />
              {errors?.email && (
                <div>
                  <div>
                    <SvgIconWarning />
                  </div>
                </div>
              )}
              <Input type="submit" value="Subscribe" />
            </form>
          ) : (
            <motion.div key="submitted" {...defaultPresenceProps}>
              <p>Please check your mail</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default MailSub
