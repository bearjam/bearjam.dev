import { motion } from "framer-motion"
import { graphql } from "gatsby"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { slalom } from "../animations"
import { SvgIsometricOne } from "../components/art"
import { SvgIconWarning } from "../components/icons"
import { Input } from "../components/inputs"
import { ButtonLink } from "../components/links"
import MDX from "../components/mdx"
import Presence from "../components/presence"
import SEO from "../components/seo"
import styles from "./home.module.css"

const HomeTemplate = ({ data }) => {
  const { frontmatter } = data.mdx
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onSubmit",
  })
  const { isSubmitted } = formState
  const [variant, setVariant] = useState("default")

  const onSubmit = async data => {
    try {
      console.log("pending")
      setVariant("pending")
      await new Promise((res, rej) => {
        let roll = Math.random() > 0.5
        if (roll) {
          setTimeout(res, 2000)
        } else {
          setTimeout(rej, 3000)
        }
      })
      console.log("success")
      setVariant("success")
    } catch {
      console.log("failure")
      setVariant("default")
    }
  }

  const transition = {
    // type: "spring",
    // damping: 10,
    // mass: 1,
    // stiffness: 100,
  }

  return (
    <>
      <SEO title="Home" />
      <Presence key="indexPage" className="px-2">
        <section className={styles.splash}>
          <motion.div className={styles.isometricOne} variants={slalom(1)}>
            <SvgIsometricOne />
          </motion.div>
          <motion.div className={styles.headline} variants={slalom(0)}>
            <h1>{frontmatter.headline.heading}</h1>
            <p>{frontmatter.headline.paragraph}</p>
            <div>
              <ButtonLink to="/about" variant="primary">
                {`About us`}
              </ButtonLink>
              <ButtonLink to="/contact" variant="secondary">
                {`Work with us`}
              </ButtonLink>
            </div>
          </motion.div>
        </section>
        <section className={styles.whatWeDo}>
          <motion.h1 variants={slalom(0)}>
            {frontmatter.whatWeDo.heading}
          </motion.h1>
          <div>
            {frontmatter.whatWeDo.blurbs.map(({ heading, blurb }, i) => (
              <motion.div
                key={heading}
                variants={slalom(i)}
                className={styles.blurb}
              >
                <h3>{heading}</h3>
                <div>
                  <MDX>{blurb}</MDX>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </Presence>
      <section className={styles.mailSub}>
        <div className={styles.mailSub}>
          <div>
            <h1>{frontmatter.mailSub.heading}</h1>
            <p>{frontmatter.mailSub.blurb}</p>
          </div>
          {variant === "success" ? (
            <motion.p enter={{ opacity: 1 }} initial={{ opacity: 0 }}>
              Cheers
            </motion.p>
          ) : (
            <motion.form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              initial="default"
              animate={variant}
              exit={{ opacity: 0 }}
              variants={{
                default: {},
                pending: {},
              }}
              transition={{
                staggerChildren: 0.2,
              }}
            >
              <motion.div
                className={styles.field}
                variants={{
                  pending: {
                    scaleX: 0,
                  },
                  default: {
                    scaleX: 1,
                  },
                }}
                transition={transition}
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
                    <div className={styles.errorIcon}>
                      <SvgIconWarning />
                    </div>
                  </div>
                )}
              </motion.div>
              <motion.div
                className={styles.submit}
                variants={{
                  default: {
                    scaleX: 1,
                  },
                  pending: {
                    scaleX: 0,
                  },
                }}
                transition={transition}
              >
                <Input type="submit" value="Subscribe" />
              </motion.div>
            </motion.form>
          )}
        </div>
      </section>
    </>
  )
}

export default HomeTemplate

export const query = graphql`
  query HomeQuery($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        templateKey
        headline {
          heading
          paragraph
        }
        title
        whatWeDo {
          blurbs {
            heading
            blurb
          }
          heading
        }
        mailSub {
          heading
          blurb
        }
      }
    }
  }
`
