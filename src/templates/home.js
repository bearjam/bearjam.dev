import { motion } from "framer-motion"
import React from "react"
import { springQuickExit, springTwo } from "../animations"
import { Link } from "../components/Link"
import Presence from "../components/Presence"
import SEO from "../components/SEO"
import { SvgIsometricOne } from "../components/svg"

const variants = i => ({
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      ...springTwo,
    },
  },
  exit: {
    opacity: 0,
    x: i % 2 === 0 ? -200 : 200,
    transition: {
      ...springQuickExit,
    },
  },
})

const HomeTemplate = ({ frontmatter, children }) => {
  return (
    <>
      <SEO title="Home" />
      <Presence key="indexPage">
        <section className="mt-5 sm:mt-8 flex items-center flex-col sm:flex-row sm:justify-between">
          <motion.div
            className="w-full mb-4 sm:order-last sm:flex-1 flex justify-end max-w-lg"
            variants={variants(1)}
          >
            <SvgIsometricOne className="w-full" />
          </motion.div>
          <motion.div
            className="my-6 text-center sm:flex-1 sm:text-left sm:max-w-xs"
            variants={variants(0)}
          >
            <h1 className="leading-10">{frontmatter.headline.heading}</h1>
            <p className="leading-6 tracking-wide my-6">
              {frontmatter.headline.paragraph}
            </p>
            <div className="flex justify-center mt-6 sm:justify-start">
              <Link to="/blog" className="button">
                Read blog
              </Link>
            </div>
          </motion.div>
        </section>
        <section className="mt-12 sm:mt-0">
          <motion.h1
            className="leading-10 text-center sm:text-left"
            variants={variants(0)}
          >
            {frontmatter.stuffWeDo.heading}
          </motion.h1>
          <div className="flex flex-wrap justify-between">
            {frontmatter.stuffWeDo.blurbs.map(({ heading, blurb }, i) => (
              <motion.div
                key={heading}
                className="w-full sm:w-5/12 sm:flex-grow sm:max-w-xs lg:max-w-sm mt-8"
                variants={variants(i)}
              >
                <h3>{heading}</h3>
                <p className="my-2 sm:pr-8 md:pr-4 lg:pr-0">{blurb}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </Presence>
      <section className="mt-2 sm:mt-0 flex flex-col border-2 border-red-500 bg-purple-200">
        <div className="mt-4 mx-2">
          <h2>
            We'd love to hear from you.
            <br />
            Say hello to magda@bearjam.dev
          </h2>
        </div>
        <div className="mt-6 flex justify-center">
          <Link to="/about" className="button">
            About us
          </Link>
        </div>
        <div className="mt-4 mb-6 flex justify-center">
          <Link to="/contact" className="button">
            Work with us
          </Link>
        </div>
      </section>
    </>
  )
}

export default HomeTemplate
