import loadable from "@loadable/component"
import { motion } from "framer-motion"
import { graphql } from "gatsby"
import React from "react"
import { slalom } from "../animations"
import { SvgIsometricOne } from "../components/art"
import { ButtonLink } from "../components/links"
import MDX from "../components/mdx"
import Presence from "../components/presence"
import SEO from "../components/seo"
import Svg from "../components/svg"
import styles from "./home.module.css"

const MailSub = loadable(() => import("../components/mail-sub"))

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
            {frontmatter.whatWeDo.blurbs.map(({ heading, blurb, svg }, i) => (
              <motion.div
                key={heading}
                variants={slalom(i)}
                className={styles.blurb}
              >
                <div className={styles.illustration}>
                  <Svg data={svg} />
                </div>
                <h3>{heading}</h3>
                <div>
                  <MDX>{blurb}</MDX>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </Presence>
      <MailSub frontmatter={frontmatter} />
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
            svg {
              childSvgoInline {
                inlineSVG
              }
            }
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
