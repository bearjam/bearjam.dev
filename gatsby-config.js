module.exports = {
  siteMetadata: {
    title: `Bearjam`,
    description: `Bearjam Web Development`,
    author: `@bearjamdev`,
    seo: {
      ogp: {
        image: `/images/ogp-seo-image.png`,
      },
      twitter: {
        image: `/images/twitter-seo-image.png`,
      },
    },
    siteUrl: `https://bearjam.dev`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.js`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    `gatsby-transformer-svgo-inline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/data/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/data/blog`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          `gatsby-remark-katex`,
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: `Hop Light`,
              extensions: ["theme-hop-light"],
            },
          },
        ],
        remarkPlugins: [require("remark-math")],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bearjam`,
        short_name: `Bearjam`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6710f2`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/assets/favicon.svg`, // This path is relative to the root of the site.
      },
    },
    // `gatsby-plugin-catch-links`,
    // `gatsby-plugin-offline`
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ],
}
