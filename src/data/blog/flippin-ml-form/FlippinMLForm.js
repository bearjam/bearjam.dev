import React from "react"
import { useForm } from "react-hook-form"
import styles from "./mail-sub-form.module.css"

const FlippinMLForm = () => {
  const { register, errors } = useForm({
    mode: "onBlur",
  })

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.scene}>
          <div className={styles.text}>
            <h2>Subscribe to our mailing list</h2>
          </div>
          <div className={styles.card}>
            <div className={styles.cardFront}>
              <form>
                <div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="foo"
                    aria-invalid={errors?.email ? "true" : "false"}
                    aria-describedby="emailError"
                    placeholder="E-mail address"
                    ref={register}
                  />
                  <input type="submit" value="Subscribe" />
                </div>
              </form>
            </div>
            <div className={styles.cardBack}></div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FlippinMLForm
