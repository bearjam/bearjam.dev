import React from "react"
import { useForm } from "react-hook-form"
import styles from "./mail-sub-form.module.css"

const FlippinMLForm = () => {
  const { register, errors } = useForm({
    mode: "onBlur",
  })

  return (
    <>
      <div className={styles.scene}>
        <div className={styles.card}>
          <div className={styles.front}>
            <form className="bg-indigo-500 p-4 shadow-lg rounded-lg">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="foo"
                aria-invalid={errors?.email ? "true" : "false"}
                aria-describedby="emailError"
                ref={register}
              />
              <input type="submit" />
            </form>
          </div>
          <div className={styles.back}></div>
        </div>
      </div>
    </>
  )
}

export default FlippinMLForm
