export function noop() {}

export const inBrowser = typeof document !== "undefined" && !!document.scripts
export const inWechat = process.env.TARO_ENV === "weapp"
export const inSwan = process.env.TARO_ENV === "swan"
export const inAlipay = process.env.TARO_ENV === "alipay"
export const inQQ = process.env.TARO_ENV === "qq"
export const inToutiao = process.env.TARO_ENV === "tt"
