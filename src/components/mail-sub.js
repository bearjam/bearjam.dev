import React from "react"
import styles from "./mail-sub.module.css"
import { motion } from "framer-motion"
import DoubleSided from "./double-sided"
import { Input } from "./inputs"
import { SvgIconWarning } from "./icons"
import { useForm } from "react-hook-form"
import { useState } from "react"

const MailSub = ({ frontmatter }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
  })
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
          setState("initial")
        }
      })
      .catch(err => {
        console.log(err)
        setState("initial")
      })
  }
  return (
    <div>
      <div>
        <h1>{frontmatter.mailSub.heading}</h1>
        <p>{frontmatter.mailSub.blurb}</p>
      </div>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        // initial="initial"
        animate={state}
        transition={{
          staggerChildren: 0.3,
        }}
      >
        <motion.div>
          <DoubleSided
            variants={{
              initial: {
                rotateX: 0,
              },
              pending: {
                rotateX: 360,
                transition: {
                  type: "spring",
                  damping: 0,
                  mass: 5,
                },
              },
              success: {
                rotateX: 180,
              },
            }}
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
            <div>
              <p
                variants={{
                  initial: {
                    opacity: 0,
                  },
                  pending: {
                    opacity: 1,
                  },
                  success: {
                    opacity: 1,
                  },
                }}
              >
                {`Check your email!`}
              </p>
            </div>
          </DoubleSided>
          {errors?.email && (
            <div>
              <div>
                <SvgIconWarning />
              </div>
            </div>
          )}
        </motion.div>
        <motion.div
          className="inline-block"
          variants={{
            initial: {
              scale: 1,
            },
            pending: {
              scale: 0.5,
              transition: {
                type: "spring",
                damping: 0,
                mass: 5,
              },
            },
            success: {
              scale: 0,
            },
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Input type="submit" value="Subscribe" />
        </motion.div>
      </motion.form>
    </div>
  )
}

export default MailSub
