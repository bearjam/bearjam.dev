import { motion } from "framer-motion"
import React from "react"
import { springQuickExit, springTwo } from "../animations"
import { Link } from "../components/Link"
import Presence from "../components/Presence"
import SEO from "../components/SEO"
import { SvgIsometricOne } from "../components/svg"
import styles from "../styles/home.module.css"
import cx from "classnames"

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
      <Presence key="indexPage" className="px-2">
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
              <Link to="/blog" className="button bg-pink-400 text-white px-4 py-2">
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
      <section className={styles.sayHello}>
        <div className="sm:flex sm:justify-between">
          <div className="text-center sm:text-left">
            <h2>
              We'd love to hear from you.
              <br />
              Say hello to magda@bearjam.dev
            </h2>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:justify-between w-1/2 pl-16">
            <div className="mt-2 flex justify-center items-center sm:mt-0">
              <Link to="/about" className="button bg-pink-400 text-white py-2 w-1/3 sm:w-auto sm:px-10 text-center">
                About us
              </Link>
            </div>
            <div className="mt-4 flex justify-center items-center sm:mt-0">
              <Link to="/contact" className="button bg-white border-2 border-pink-400 text-pink-400 py-2 w-1/3 sm:w-auto sm:px-10 text-center">
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
