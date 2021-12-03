module.exports = {
  pathPrefix: process.env.NODE_ENV === "development" ? "/" : "/taroify.com",
  siteMetadata: {
    title: "Taroify",
    siteUrl: "https://www.taroify.com",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        isTSX: true, // defaults to false
        jsxPragma: "jsx", // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Taroify",
        short_name: "Taroify",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#4fc08d",
        display: "minimal-ui",
        icon: "src/images/icon.png",
        theme_color_in_head: false,
      },
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        // Setting a color is optional.
        color: "#4fc08d",
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./content/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: ".content",
        path: "./.content/",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem",
            },
          },
          "gatsby-remark-autolink-headers",
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              inlineCodeMarker: "÷",
            },
          },
          "gatsby-remark-smartypants",
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-baidu-analytics",
      options: {
        // baidu analytics siteId
        siteId: "53df1d7fd1cfda80d49b45121c1c939c",
        // Put analytics script in the head instead of the body [default:false]
        head: false,
      },
    },
  ],
}
