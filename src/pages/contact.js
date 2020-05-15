import cx from "classnames"
import { motion } from "framer-motion"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import theme from "tailwindcss/defaultTheme"
import { object, string } from "yup"
import { slalom } from "../animations"
import { SvgThankBear } from "../components/art"
import { SvgIconWarning } from "../components/icons"
import Presence from "../components/presence"
import SEO from "../components/seo"
import styles from "./contact.module.css"

const ContactPage = () => {
  const validationSchema = object().shape({
    name: string()
      .required("Required")
      .min(2, ({ min }) => `Minimum ${min} characters`)
      .max(100, ({ max }) => `Maximum ${max} characters`),
    email: string().required("Required").email("Invalid e-mail address"),
    need: object().test({
      test: o => Object.keys(o).reduce((p, n) => o[n] || p, false),
      message: "Select at least one",
    }),
    message: string()
      .required("Required")
      .min(10, ({ min }) => {
        return `Minimum ${min} characters`
      })
      .max(1000, ({ max }) => `Maximum ${max} characters`),
  })

  const { register, handleSubmit, watch, errors, formState } = useForm({
    mode: "onBlur",
    validationSchema,
  })

  const { isSubmitted } = formState

  const [variant, setVariant] = useState("default")

  const onSubmit = data =>
    fetch(`./api/foo`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        console.log(`res!`)
        console.log(res)
        setVariant("success")
      })
      .catch(err => {
        console.log(`err!`)
        console.log(err)
        setVariant("default")
      })

  return (
    <Presence key="contactPage" className="px-2">
      <SEO title="Contact" />
      <motion.div
        key="contactHeadings"
        className={styles.headings}
        animate={variant === "default" ? "enter" : variant}
        initial="exit"
        exit="exit"
        variants={{
          enter: {
            transition: {
              staggerChildren: 0.2,
            },
          },
          exit: {
            transition: {
              staggerChildren: 0.2,
              staggerDirection: -1,
            },
          },
          success: {
            opacity: 0,
            height: 0,
            transition: {
              height: {
                delay: 0.3,
              },
              opacity: {
                delay: 0,
              },
              type: "spring",
            },
          },
        }}
      >
        <motion.h1 variants={slalom(0)}>Say hello!</motion.h1>
        <motion.h2 variants={slalom(1)}>
          Get a free 1-to-1 consultation
        </motion.h2>
      </motion.div>
      <div className={styles.scene}>
        <motion.div
          key="contactCard"
          className={styles.card}
          initial="exit"
          exit="exit"
          animate={variant}
          variants={{
            exit: {
              rotateY: 90,
            },
            default: {
              rotateY: 0,
            },
            success: {
              rotateY: 180,
              transition: {
                type: "spring",
                damping: 5,
                mass: 3,
                stiffness: 80,
                delay: 0.3,
              },
            },
          }}
          transition={{
            type: "spring",
            mass: 2,
            stiffness: 200,
            damping: 100,
            restDelta: 3,
            restSpeed: 3,
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
            noValidate
          >
            <div>
              <label htmlFor="name">Name</label>
              <div className={styles.field}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  aria-invalid={errors?.name ? "true" : "false"}
                  aria-describedby="nameError"
                  ref={register}
                />
                {errors?.name && (
                  <>
                    <div className={styles.errorIcon}>
                      <SvgIconWarning />
                    </div>

                    <div className={styles.errorMessage}>
                      <span id="nameError">{errors.name?.message}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>

              <div className={styles.field}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  aria-invalid={errors?.email ? "true" : "false"}
                  aria-describedby="emailError"
                  ref={register}
                />

                {errors?.email && (
                  <>
                    <div className={styles.errorIcon}>
                      <SvgIconWarning />
                    </div>
                    <div className={styles.errorMessage}>
                      <span id="emailError">{errors.email?.message}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <fieldset name="need" className={styles.field}>
              <legend>What do you need?</legend>
              <div>
                {[
                  { name: "website", label: "Website" },
                  { name: "mobileApp", label: "Mobile App" },
                  { name: "webApp", label: "Web App" },
                  { name: "branding", label: "Branding" },
                  { name: "other", label: "Other" },
                ].map(({ name, label }) => {
                  return (
                    <motion.label
                      htmlFor={name}
                      key={name}
                      className={styles.selectBox}
                      variants={{
                        active: {
                          backgroundColor: theme.colors.pink[400],
                          color: theme.colors.white,
                        },
                        inactive: {
                          backgroundColor: `rgba(255, 255, 255, 0)`,
                          color: "inherit",
                        },
                      }}
                      animate={watch()[`need.${name}`] ? `active` : `inactive`}
                    >
                      <span>{label}</span>
                      <input
                        type="checkbox"
                        id={name}
                        name={`need.${name}`}
                        ref={register}
                      />
                    </motion.label>
                  )
                })}
              </div>

              {errors?.need && (
                <div className={styles.errorMessage2}>
                  <span id="needError">{errors.need?.message}</span>
                  <div className={styles.errorIcon2}>
                    <SvgIconWarning />
                  </div>
                </div>
              )}
            </fieldset>

            <div className={styles.field}>
              <label htmlFor="message">Tell us more</label>
              <textarea
                id="message"
                name="message"
                ref={register}
                aria-invalid={errors?.message ? "true" : "false"}
                aria-describedby="messageError"
              />
              {errors?.message && (
                <div className={styles.errorMessage2}>
                  <span id="messageError">{errors.message?.message}</span>
                  <div className={styles.errorIcon2}>
                    <SvgIconWarning />
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="mt-4 flex justify-center">
                <input type="submit" />
              </div>
              {isSubmitted && variant === "default" && (
                <div className={styles.errorMessage2}>
                  <span id="submissionError" className="text-red-600">
                    Submission error, please try again
                  </span>
                  <div className={styles.errorIcon2}>
                    <SvgIconWarning />
                  </div>
                </div>
              )}
            </div>
          </form>
          <div className={cx(styles.cardFace, styles.back)}>
            <h2>Thank You!</h2>
            <SvgThankBear className="w-10 my-2" />
            <h4>We'll be in touch soon</h4>
          </div>
        </motion.div>
      </div>
    </Presence>
  )
}

export default ContactPage
