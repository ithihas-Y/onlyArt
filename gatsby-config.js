// require("dotenv").config({path: `.env.${process.env.NODE_ENV}`,})
const path = require('path')
module.exports = {
    siteMetadata: {
        title: `Only Art Foundation`,
        // author: {
        //     name: `Kyle Mathews`,
        //     summary: `who lives and works in San Francisco building useful things.`,
        // },
        // description: `A starter blog demonstrating what Gatsby can do.`,
        // siteUrl: `https://gatsbystarterblogsource.gatsbyjs.io/`,
        // social: {
        //     twitter: `kylemathews`,
        // },
    },
    plugins: [
        `gatsby-plugin-image`,
        {
            resolve: "gatsby-plugin-gatsby-cloud",
            options: {
                // headers: {
                //     "/fonts/*": [
                //         "Cache-Control: max-age=31536000"
                //     ],
                //     "/meta/*": [
                //         "Cache-Control: max-age=31536000"
                //     ],
                //     "**/*.woff": [
                //         "Cache-Control: max-age=31536000"
                //     ],
                //     "**/*.woff2": [
                //         "Cache-Control: max-age=31536000"
                //     ],
                //     "**/*.js": [
                //         "Cache-Control: max-age=31536000"
                //     ],
                // },
                mergeCachingHeaders: true,
                allPageHeaders: [
                    "Cache-Control: public, max-age=604800, immutable"
                ],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `posts`,
              path: `${__dirname}/src/content/posts`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `artists`,
              path: `${__dirname}/src/content/artists`,
            },
        },
        {
            resolve: 'gatsby-plugin-mailchimp',
            options: {
                endpoint: 'https://onlyartfoundation.us5.list-manage.com/subscribe/post?u=79093faa19168598b12f02c0f&amp;id=eb6a0893fd', // string; add your MC list endpoint here; see instructions below
                timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
            },
        },
        // {
        //     resolve: `gatsby-plugin-translate`,
        //     options: {
        //       googleApiKey: '<your_key>', // OPTIONAL: only when Google's translation are set
        //       sourceLanguage: 'en',
        //       targetLanguages: ['es', 'de'],
        //     //   translateSlug: false, // OPTIONAL: requires Google API key
        //     }
        // },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 630,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        // {
        //   resolve: `gatsby-plugin-google-analytics`,
        //   options: {
        //     trackingId: `ADD YOUR TRACKING ID HERE`,
        //   },
        // },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `OnlyArt Foundation`,
                short_name: `OnlyArt`,
                start_url: `/`,
                background_color: `#7030A0`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/onlyart-logo-3.png`, // This path is relative to the root of the site.
                // src/images/onlyart-logo-3.png
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /assets/ // See below to configure properly
                }
            }
        },
        {
            resolve: 'gatsby-plugin-root-import',
            options: {
                src: path.join(__dirname, 'src'),
                components: path.join(__dirname, 'src/components'),
                pages: path.join(__dirname, 'src/pages'),
                assets: path.join(__dirname, 'src/assets')
            }
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-gatsby-cloud`,
        `gatsby-plugin-postcss`,
        `gatsby-plugin-sass`,
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
