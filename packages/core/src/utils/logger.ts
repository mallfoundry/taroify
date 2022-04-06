// type LogLevel = "debug" | "info" | "warn" | "error"

// export function configure(level: LogLevel) {
//   if (level === "debug") {
//     logLevel = debugLevel
//   }
// }

const debugLevel = 1
const infoLevel = debugLevel << 2
const warnLevel = infoLevel << 2

const logConfig = {
  level: debugLevel,
}

export function getLogger(name: string) {
  return {
    warn(message?: any, ...optionalParams: any[]) {
      if (logConfig.level <= warnLevel) {
        // eslint-disable-next-line no-console
        console.warn(`Taroify - ${name} : ${message}`, ...optionalParams)
      }
    },

    deprecated(message?: any, ...optionalParams: any[]) {
      if (logConfig.level <= warnLevel) {
        // eslint-disable-next-line no-console
        console.warn(`[Deprecated] Taroify - ${name} : ${message}`, ...optionalParams)
      }
    },
  }
}
