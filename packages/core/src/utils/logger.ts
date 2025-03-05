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
        console.warn(`Taroify - ${name} : ${message}`, ...optionalParams)
      }
    },

    deprecated(message?: any, ...optionalParams: any[]) {
      if (logConfig.level <= warnLevel) {
        console.warn(`[Deprecated] Taroify - ${name} : ${message}`, ...optionalParams)
      }
    },
  }
}
