import { motion } from "framer-motion"
import React from "react"
import { useForm } from "react-hook-form"
import theme from "tailwindcss/defaultTheme"
import Presence from "../components/Presence"
import styles from "../styles/contact-form.module.css"
import cx from "classnames"

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

const ContactPage = () => {
  const { register, handleSubmit, watch, errors, formState } = useForm({
    mode: "onBlur",
  })

  const { isValid } = formState

  const onSubmit = async (data, e) => {
    // check client-side validation

    // kick off loading state

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
          <input
            type="text"
            id="name"
            name="name"
            aria-invalid={errors?.name ? "true" : "false"}
            aria-describedby="nameError"
            ref={register({ required: true })}
          />
          <span
            id="nameError"
            className={cx({ hidden: !errors?.name }, "bg-blue-200")}
          >
            This field is required
          </span>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            aria-invalid={errors?.email ? "true" : "false"}
            aria-describedby="emailError"
            ref={register({
              required: "E-mail is required",
              validate: v => EMAIL_REGEX.test(v) || "Invalid e-mail address",
            })}
          />
          <span
            id="emailError"
            className={cx({ hidden: !errors?.email }, "bg-blue-200")}
          >
            {errors?.email?.message}
          </span>
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
                  <input type="checkbox" id={name} name={name} ref={register} />
                </motion.label>
              )
            })}
          </div>
        </fieldset>

        <div className="mt-4">
          <label htmlFor="message">Tell us more</label>
          <textarea
            id="message"
            name="message"
            ref={register({ required: true, minLength: 15 })}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <input type="submit" disabled={!isValid}/>
        </div>
      </form>
    </Presence>
  )
}

export default ContactPage
