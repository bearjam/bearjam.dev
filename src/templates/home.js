import { motion } from "framer-motion"
import { graphql } from "gatsby"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { slalom } from "../animations"
import { SvgIsometricOne } from "../components/art"
import DoubleSided from "../components/double-sided"
import { SvgIconWarning } from "../components/icons"
import { Input } from "../components/inputs"
import { ButtonLink } from "../components/links"
import MailSub from "../components/mail-sub"
import MDX from "../components/mdx"
import Presence from "../components/presence"
import SEO from "../components/seo"
import styles from "./home.module.css"

const HomeTemplate = ({ data }) => {
  const { frontmatter } = data.mdx
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
  })
  const [state, setState] = useState("initial")

  const onSubmit = async data => {
    setState("pending")
    try {
      let response = await fetch("/api/mailing-list/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setState("success")
      } else {
        setState("initial")
      }
    } catch (err) {
      console.log("err!", err)
      setState("initial")
    }
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
          <motion.form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            animate={state}
            transition={{
              staggerChildren: 0.3,
            }}
          >
            <motion.div className={styles.field}>
              <DoubleSided
                className="w-64 h-10"
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
                <div className={styles.inputBack}>
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
                  <div className={styles.errorIcon}>
                    <SvgIconWarning />
                  </div>
                </div>
              )}
            </motion.div>
            <motion.div
              className={styles.submit}
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
            >
              <Input type="submit" value="Subscribe" />
            </motion.div>
          </motion.form>
        </div>
      </section>
      {/* <section className={styles.mailSub}>
        <MailSub frontmatter={frontmatter} />
      </section> */}
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
