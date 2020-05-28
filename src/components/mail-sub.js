import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { defaultPresenceProps } from "../animations"
import { SvgIconWarning } from "./icons"
import { Input } from "./inputs"
import styles from "./mail-sub.module.css"
import Logo3D from "./logo-3d"

const MailSub = ({ frontmatter }) => {
  const { register, handleSubmit, errors, setError } = useForm({
    mode: "onSubmit",
  })
  const [state, setState] = useState("initial")

  const onSubmit = async data => {
    setState("loading")
    try {
      let fetcher = fetch("/api/mailing-list/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }),
        timer = new Promise(res => setTimeout(res, 1500)),
        [res] = await Promise.all([fetcher, timer])
      if (res.ok) {
        setState("success")
      } else {
        setState("initial")
      }
    } catch (err) {
      setState("initial")
      setError("email", null, "Error, please try again")
    }
  }

  return (
    <section className={styles.root}>
      <div>
        <AnimatePresence>
          <div className={styles.headingBlurb}>
            <h1>{frontmatter.mailSub.heading}</h1>
            {state === "initial" && (
              <motion.p key="blurb" {...defaultPresenceProps}>
                {frontmatter.mailSub.blurb}
              </motion.p>
            )}
          </div>
          {state === "initial" ? (
            <motion.form
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
            </motion.form>
          ) : state === "loading" ? (
            <motion.div
              key="loading"
              className={styles.loadingLogo}
              {...defaultPresenceProps}
            >
              <Logo3D />
            </motion.div>
          ) : state === "success" ? (
            <motion.p
              key="success"
              {...defaultPresenceProps}
              className={styles.success}
            >
              Please check your mail
            </motion.p>
          ) : (
            <p>unreachable</p>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default MailSub
