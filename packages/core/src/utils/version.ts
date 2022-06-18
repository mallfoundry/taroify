import { getSystemInfoSync } from "@tarojs/taro"
import { inQQ, inWechat } from "./base"

function compareVersion(o1: string, o2: string) {
  const v1 = o1.split(".")
  const v2 = o2.split(".")
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push("0")
  }
  while (v2.length < len) {
    v2.push("0")
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i], 10)
    const num2 = parseInt(v2[i], 10)

    if (num1 > num2) {
      return 1
    }
    if (num1 < num2) {
      return -1
    }
  }

  return 0
}

function gte(version: string) {
  const { SDKVersion } = getSystemInfoSync()
  return SDKVersion && compareVersion(SDKVersion, version) >= 0
}

export function canIUseCanvas2d() {
  if (inQQ) {
    return false
  }
  if (inWechat) {
    return gte("2.9.0")
  }
  return true
}
