/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

function SEO({ description, lang, meta, title, image }) {
  const {
    site: {
      siteMetadata: {
        title: defaultTitle,
        description: defaultDescription,
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

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title || defaultTitle}
      titleTemplate={`%s | ${title || defaultTitle}`}
      meta={[
        {
          name: `description`,
          content: description || defaultDescription,
        },
        {
          property: `og:title`,
          content: title || defaultTitle,
        },
        {
          property: `og:description`,
          content: description || defaultDescription,
        },
        {
          property: `og:type`,
          content: `website`,
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
          content: title || defaultTitle,
        },
        {
          name: `twitter:description`,
          content: description || defaultDescription,
        },
        {
          name: `twitter:image`,
          content: `${siteUrl}${image || defaultImage}`,
        },
        {
          name: `og:image`,
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
