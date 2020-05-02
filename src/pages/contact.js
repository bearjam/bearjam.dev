import { motion } from "framer-motion"
import React from "react"
import { useForm } from "react-hook-form"
import theme from "tailwindcss/defaultTheme"
import Presence from "../components/Presence"
import styles from "../styles/contact-form.module.css"
import { SvgIconWarning } from "../components"
import * as yup from "yup"

const ContactPage = () => {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Required")
      .min(2, min => `Minimum ${min} characters`)
      .max(100, max => `Maximum ${max} characters`),
    email: yup.string().required("Required").email("Invalid e-mail address"),
    need: yup.object().test({
      test: o => Object.keys(o).reduce((p, n) => o[n] || p, false),
      message: "Select at least one",
    }),
    message: yup
      .string()
      .required("Required")
      .min(10, ({ min }) => `Minimum ${min} characters`)
      .max(1000, ({ max }) => `Maximum ${max} characters`),
  })

  const { register, handleSubmit, watch, errors, formState } = useForm({
    mode: "onBlur",
    validationSchema,
  })

  const { isValid } = formState

  const onSubmit = async (data, e) => {
    // check client-side validation

    // kick off loading state

    if (!isValid) {
      return
    }



    // effect
    try {
      const response = await fetch(`./api/foo`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log(`response!\n${JSON.stringify(response, null, 2)}`)
    } catch (error) {
      console.log(`error!\n${error}`)
    }

    // either:
    // a) success -> thank you for your message, we'll be in touch
    // b) problem -> please try again later? check validation?
  }

  return (
    <Presence>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        <div>
          <label htmlFor="name">Name</label>
          <div className="relative">
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
                <div className="w-6 h-6 absolute top-0 right-0 p-1 mr-1">
                  <SvgIconWarning />
                </div>

                <div className="flex justify-end">
                  <span id="nameError" className="text-red-600">
                    {errors.name?.message}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="email">Email</label>

          <div className="relative">
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
                <div className="w-6 h-6 absolute top-0 right-0 p-1 mr-1">
                  <SvgIconWarning />
                </div>
                <div className="flex justify-end">
                  <span id="emailError" className="text-red-600">
                    {errors.email?.message}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <fieldset name="need">
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
                    },
                    inactive: {
                      backgroundColor: `rgba(255, 255, 255, 0)`,
                    },
                  }}
                  animate={watch()[name] ? `active` : `inactive`}
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
            <div className="flex justify-end">
              <span id="needError" className="text-red-600">
                {errors.need?.message}
              </span>
              <div className="w-6 h-6 p-1 ml-1">
                <SvgIconWarning />
              </div>
            </div>
          )}
        </fieldset>

        <div className="mt-4">
          <label htmlFor="message">Tell us more</label>
          <textarea
            id="message"
            name="message"
            ref={register}
            aria-invalid={errors?.message ? "true" : "false"}
            aria-describedby="messageError"
          />
          {errors?.message && (
            <div className="flex justify-end">
              <span id="messageError" className="text-red-600">
                {errors.message?.message}
              </span>
              <div className="w-6 h-6 p-1 ml-1">
                <SvgIconWarning />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <input type="submit" />
        </div>
      </form>
    </Presence>
  )
}

export default ContactPage
