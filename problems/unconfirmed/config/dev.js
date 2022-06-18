// eslint-disable-next-line import/no-commonjs
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  env: {
    // eslint-disable-next-line
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  plugins: [
    [
      "@tarojs/plugin-platform-lark",
      {
        pc: false,
      },
    ],
  ],
  mini: {
    webpackChain(chain) {
      // lodash bundle reduction
      // `shorthands`, `coercions`, `paths` are necessary to avoid some weird things
      chain.plugin("lodash-webpack-plugin").use(require("lodash-webpack-plugin"), [
        {
          shorthands: true,
          cloning: true,
          caching: true,
          collections: true,
          exotics: true,
          guards: true,
          memoizing: true,
          coercions: true,
          flattening: true,
          paths: true,
        },
      ])

      chain.merge({
        optimization: {
          splitChunks: {
            // `all` or `initial`, `all` will have the smallest overall size, refer to
            // https://stackoverflow.com/questions/50127185/webpack-what-is-the-difference-between-all-and-initial-options-in-optimizat
            chunks: "all",
            cacheGroups: {
              lodash: {
                name: "lodash",
                priority: 100,
                test(module) {
                  return /node_modules[\\/]lodash/.test(module.context)
                },
              },
              taroify: {
                name: "taroify",
                test(module) {
                  if (/package[\\/](core|icons|hooks)/.test(module.resource)) {
                    return true
                  }
                  if (/bundles[\\/](core|icons|hooks)/.test(module.resource)) {
                    return true
                  }
                  return /node_modules[\\/]@taroify/.test(module.resource)
                },
                //
                // test: /node_modules[\\/]@taroify/,
                // just higher than 10 will be fine, refer to
                // https://github.com/NervJS/taro/blob/bc6af68bda2cbc9163fbda36c15878fc96aec8f1/packages/taro-mini-runner/src/webpack/build.conf.ts#L220-L254
                priority: 100,
              },
            },
          },
          // turn on below `minimize`, `minimizer` settings if bundle size is way too large
          // to do remote debug in wechatdevtools
          minimize: true,
          minimizer: [
            new TerserPlugin({
              // add those `bundle`s your want to do size reduction
              // refer to https://webpack.js.org/plugins/terser-webpack-plugin/#test
              test: ["common.js", "taro.js", "vendors.js", "lodash.js", "taroify.js"],
              parallel: true,
              // minify: TerserPlugin.swcMinify,
              cache: true,
              extractComments: true,
              // should work with `mini.sourceMapType='source-map'`
              // refer to https://webpack.js.org/plugins/terser-webpack-plugin/#note-about-source-maps
              sourceMap: true,
            }),
          ],
        },
      })
      // enable webpack-bundle-analyzer
      // if you would like to do some bundle reduction stuff
      // chain.plugin("analyzer")
      //   .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin, [{
      //     analyzerPort: "auto",
      //     generateStatsFile: true,
      //   }])
    },
    commonChunks(commonChunks) {
      commonChunks.push("lodash")
      commonChunks.push("taroify")
      return commonChunks
    },
    // turn to source-map if TerserPlugin is on
    // refer to http://taro-docs.jd.com/taro/docs/config-detail/#minisourcemaptype
    sourceMapType: "source-map",
  },
  h5: {},
}
