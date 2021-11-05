const config = {
  projectName: "@taroify/demo",
  date: "2021-3-9",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "react",
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
    webpackChain(chain) {
      // lodash bundle reduction
      // `shorthands`, `coercions`, `paths` are necessary to avoid some weird things
      chain.plugin('lodash-webpack-plugin')
        .use(require('lodash-webpack-plugin'), [{
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
        }]);

      chain.merge({
        optimization: {
          splitChunks: {
            // `all` or `initial`, `all` will have the smallest overall size, refer to
            // https://stackoverflow.com/questions/50127185/webpack-what-is-the-difference-between-all-and-initial-options-in-optimizat
            chunks: 'all',
            cacheGroups: {
              lodash: {
                name: 'lodash',
                priority: 100,
                test(module) {
                  return /node_modules[\\/]lodash/.test(module.context)
                },
              },
              taroify: {
                name: 'taroify',
                test: /node_modules[\\/]@taroify/,
                // just higher than 10 will be fine, refer to
                // https://github.com/NervJS/taro/blob/bc6af68bda2cbc9163fbda36c15878fc96aec8f1/packages/taro-mini-runner/src/webpack/build.conf.ts#L220-L254
                priority: 100,
              },
            },
          },
        },
      });
      // enable webpack-bundle-analyzer
      // if you would like to do some bundle reduction stuff
      chain.plugin('analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [{
          analyzerPort: 'auto',
          generateStatsFile: true,
        }])
    },
    commonChunks(commonChunks) {
      commonChunks.push('lodash')
      commonChunks.push('taroify')
      return commonChunks
    },
  },
  h5: {
    esnextModules: ["@taroify"],
    publicPath: process.env.NODE_ENV === "development" ? "/" : "/taroify-demo/h5",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
    output: {
      filename: "js/[name].[hash:8].js",
      chunkFilename: "chunk/[name].[chunkhash:8].js",
    },
    miniCssExtractPluginOption: {
      filename: "css/[name].[hash:8].css",
      chunkFilename: "chunk/[name].[chunkhash:8].css",
    },
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"))
  }
  return merge({}, config, require("./prod"))
}
