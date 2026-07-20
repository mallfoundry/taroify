const { watch } = require("gulp")
const { exec } = require("gulp-execa")

function watchRspressDocs() {
  watch(
    [
      "./site/content/**/*.{md,mdx}",
      "./packages/{core,commerce,hooks}/{src,docs}/**/README*.{md,mdx}",
      "./packages/demo/src/subpackages.js",
    ],
    {
      ignoreInitial: true,
      delay: 180,
      queue: true,
    },
    () =>
      exec("node site/scripts/prepare-docs.mjs", {
        stdio: "inherit",
      }),
  )
}

exports.watchRspressDocs = watchRspressDocs
