const execa = require("execa")

execa("tsc", [
  "-w",
  "-p",
  "packages/icons/tsconfig.d.json",
], {
  stdio: "inherit",
})

execa("babel", [
  "packages/icons/src/",
  "--watch",
  "--out-dir", "bundles/icons",
  "--extensions", ".ts,.tsx",
  "--source-maps",
  "--copy-files",
], {
  stdio: "inherit",
})

execa("babel", [
  "packages/core/src/",
  "--watch",
  "--out-dir", "bundles/core",
  "--extensions", ".ts,.tsx",
  "--source-maps",
  "--copy-files",
], {
  stdio: "inherit",
})

execa("tsc", [
  "-w",
  "-p",
  "packages/core/tsconfig.d.json",
], {
  stdio: "inherit",
})
