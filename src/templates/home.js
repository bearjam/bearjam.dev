import { motion } from "framer-motion"
import { graphql } from "gatsby"
import React from "react"
import { slalom } from "../animations"
import { SvgIsometricOne } from "../components/art"
import { ButtonLink } from "../components/links"
import MDX from "../components/mdx"
import Presence from "../components/presence"
import SEO from "../components/seo"
import styles from "./home.module.css"
import { Input } from "../components/inputs"

const HomeTemplate = ({ data }) => {
  const { frontmatter } = data.mdx
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
          <div className={styles.inputs}>
            <div>
              <Input type="email" placeholder="E-mail address" />
            </div>
            <div className={styles.submit}>
              <Input type="submit" value="Subscribe" />
            </div>
          </div>
          {/* <div className="mx-2 text-center sm:flex-1 sm:text-left">
            <h2>We'd love to hear from you.</h2>
            <h2 className="mt-2">Say hello to magda@bearjam.dev</h2>
          </div>
          <div className="sm:flex justify-evenly items-center sm:flex-1">
            <div className="mt-6 flex justify-center sm:block sm:m-0">
              <ButtonLink
                to="/about"
                className="button bg-pink-400 text-white w-1/3 sm:w-auto py-2 sm:px-5"
              >
                About us
              </ButtonLink>
            </div>
            <div className="mt-4 mb-6 flex justify-center sm:block sm:m-0">
              <ButtonLink
                to="/contact"
                className="button text-pink-400 bg-white w-1/3 sm:w-auto py-2 sm:px-5"
              >
                Work with us
              </ButtonLink>
            </div>
          </div> */}
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
