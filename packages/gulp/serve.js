const { exec } = require("gulp-execa")
const detectPort = require("detect-port")

const portTool = (function() {
  const port = 8900
  let availablePort = port
  return {
    getAvailablePort() {
      return availablePort
    },
    async detectPort() {
      availablePort = await detectPort(availablePort)
    }
  }
})()

exports.detectPort = async function () {
  await portTool.detectPort()
}

exports.serveDemo = () => {
  exec(`taro build --type h5 --watch --port ${portTool.getAvailablePort()}`, {
    cwd: "packages/demo",
    stdio: "inherit",
  }).catch((e) => {
    console.error(e)
  })
}

exports.serveSite = () => {
  exec(`cross-env GATSBY_DEMO_PORT=${portTool.getAvailablePort()} gatsby develop --open --host 0.0.0.0`, {
    cwd: "site",
    stdio: "inherit",
  }).catch((e) => {
    console.error(e)
  })
}
