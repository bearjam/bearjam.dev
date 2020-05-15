import { motion } from "framer-motion"
import { graphql } from "gatsby"
import React from "react"
import { slalom } from "../animations"
import { SvgIsometricOne } from "../components/art"
import { Link } from "../components/link"
import MDX from "../components/mdx"
import Presence from "../components/presence"
import SEO from "../components/seo"
import { ButtonLink } from "../components/buttons"

const HomeTemplate = ({ data }) => {
  const { frontmatter } = data.mdx
  return (
    <>
      <SEO title="Home" />
      <Presence key="indexPage" className="px-2">
        <section className="mt-5 sm:mt-6 flex items-center flex-col sm:flex-row sm:justify-between">
          <motion.div
            className="w-full mb-4 sm:order-last sm:flex-1 flex justify-end max-w-lg"
            variants={slalom(1)}
          >
            <SvgIsometricOne className="w-full" />
          </motion.div>
          <motion.div
            className="my-6 text-center sm:flex-1 sm:text-left sm:max-w-xs"
            variants={slalom(0)}
          >
            <h1 className="leading-10">{frontmatter.headline.heading}</h1>
            <p className="leading-6 tracking-wide my-6">
              {frontmatter.headline.paragraph}
            </p>
            <div className="flex justify-center items-center flex-col mt-6 sm:flex-row sm:justify-start">
              {/* <Link
                to="/blog"
                className="button m-1 bg-pink-400 text-white px-4 w-1/3 sm:w-auto py-2 sm:px-5"
              >
                Read blog
              </Link> */}
              {/* <Link
                to="/contact"
                className="button m-1 bg-white text-pink-400 border-2 border-gray-300 px-4 w-1/3 sm:w-auto py-2 sm:px-5"
              >
                Work with us
              </Link> */}
              <ButtonLink to="/about" variant="primary" className="px-5 py-2">
                {`About us`}
              </ButtonLink>
              <ButtonLink
                to="/bar"
                variant="secondary"
                className="px-5 py-2 ml-2"
              >
                {`Work with us`}
              </ButtonLink>
            </div>
          </motion.div>
        </section>
        <section className="mt-12 sm:mt-0">
          <motion.h1
            className="leading-10 text-center sm:text-left"
            variants={slalom(0)}
          >
            {frontmatter.stuffWeDo.heading}
          </motion.h1>
          <div className="flex flex-wrap justify-between">
            {frontmatter.stuffWeDo.blurbs.map(({ heading, blurb }, i) => (
              <motion.div
                key={heading}
                className="w-full sm:w-5/12 sm:flex-grow sm:max-w-xs lg:max-w-sm mt-8"
                variants={slalom(i)}
              >
                <h3>{heading}</h3>
                <div className="my-2 sm:pr-8 md:pr-4 lg:pr-0">
                  <MDX>{blurb}</MDX>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </Presence>
      <section className="bg-purple-300 border-gray-400 border-t border-b pt-4 sm:py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row">
          <div className="mx-2 text-center sm:flex-1 sm:text-left">
            <h2>We'd love to hear from you.</h2>
            <h2 className="mt-2">Say hello to magda@bearjam.dev</h2>
          </div>
          <div className="sm:flex justify-evenly items-center sm:flex-1">
            <div className="mt-6 flex justify-center sm:block sm:m-0">
              <Link
                to="/about"
                className="button bg-pink-400 text-white w-1/3 sm:w-auto py-2 sm:px-5"
              >
                About us
              </Link>
            </div>
            <div className="mt-4 mb-6 flex justify-center sm:block sm:m-0">
              <Link
                to="/contact"
                className="button text-pink-400 bg-white w-1/3 sm:w-auto py-2 sm:px-5"
              >
                Work with us
              </Link>
            </div>
          </div>
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
        stuffWeDo {
          blurbs {
            heading
            blurb
          }
          heading
        }
      }
    }
  }
`
