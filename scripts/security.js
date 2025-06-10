const { execSync } = require("node:child_process")

try {
  execSync("gitleaks --version")
} catch (error) {
  console.warn(
    "Gitleaks is not installed. Now skip security check. If you want to use gitleaks for checking security vulnerabilities, please install it from https://github.com/gitleaks/gitleaks#installation\n",
  )
  process.exit(0)
}

try {
  execSync("gitleaks protect --staged --no-banner --verbose", {
    encoding: "utf8",
    stdio: "inherit",
  })
} catch (error) {
  console.error("Gitleaks scan failed:", error.message, "\n")
  process.exit(1)
}
