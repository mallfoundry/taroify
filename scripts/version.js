const { execSync } = require("child_process")
const { version } = require("../lerna.json")

execSync(`yarn version --new-version ${version} --no-git-tag-version`, {
  stdio: "inherit",
})

execSync(`yarn version --new-version ${version} --no-git-tag-version`, {
  cwd: "site",
  stdio: "inherit",
})

execSync(`yarn add @taroify/cli@^${version} --skip-integrity-check --prefer --prefer-offline -W`, {
  stdio: "inherit",
})
