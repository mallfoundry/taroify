// eslint-disable-next-line import/no-commonjs
module.exports = {
  env: {
    // eslint-disable-next-line
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  mini: {
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
  h5: {},
}
