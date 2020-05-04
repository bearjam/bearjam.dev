module.exports = {
  siteMetadata: {
    title: `Bearjam`,
    description: `Home page for Bearjam web development company`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.js`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/content/blog`,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: `${__dirname}/src/templates/index.js`,
        },
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
    // `gatsby-plugin-offline`
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ],
}
