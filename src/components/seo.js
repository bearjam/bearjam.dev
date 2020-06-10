/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

function SEO({
  description: localDescription,
  lang,
  meta,
  title: localTitle,
  image,
}) {
  const {
    site: {
      siteMetadata: {
        siteTitle,
        description: siteDescription,
        author,
        defaultImage,
        siteUrl,
      },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            defaultImage
            siteUrl
          }
        }
      }
    `
  )

  let title = localTitle ? `${localTitle} | ${siteTitle}` : siteTitle

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      meta={[
        {
          name: `description`,
          content: localDescription || siteDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: localDescription || siteDescription,
        },
        {
          property: `og:url`,
          content: siteUrl,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `og:image`,
          content: `${siteUrl}${image || defaultImage}`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: localDescription || siteDescription,
        },
        {
          name: `twitter:image`,
          content: `${siteUrl}${image || defaultImage}`,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
}

export default SEO
