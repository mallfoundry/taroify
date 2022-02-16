import { getSystemInfoSync } from "@tarojs/taro"
import * as _ from "lodash"
import { CSSProperties } from "react"

export function addUnitPx(value?: string | number): string {
  return value === undefined ? "" : `${unitToPx(value)}px`
}

export function getSizeStyle(originSize?: string | number): CSSProperties | undefined {
  if (_.isNumber(originSize) || _.isString(originSize)) {
    const size = addUnitPx(originSize)
    return {
      width: size,
      height: size,
    }
  }
  return {}
}

export function getZIndexStyle(zIndex?: string | number) {
  const style: CSSProperties = {}
  if (zIndex !== undefined) {
    style.zIndex = +zIndex
  }
  return style
}

// cache
let rootFontSize: number

function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize

    rootFontSize = parseFloat(fontSize)
  }

  return rootFontSize
}

function convertRpx(value: string) {
  value = value.replace(/rpx/g, "")
  const { windowWidth } = getSystemInfoSync()
  const pixelRatio = 750 / windowWidth
  return +value / pixelRatio
}

function convertPx(value: string) {
  value = value.replace(/px/g, "")
  return +value
}

function convertRem(value: string) {
  value = value.replace(/rem/g, "")
  return +value * getRootFontSize()
}

function convertVw(value: string) {
  value = value.replace(/vw/g, "")
  return (+value * window.innerWidth) / 100
}

function convertVh(value: string) {
  value = value.replace(/vh/g, "")
  return (+value * window.innerHeight) / 100
}

export function unitToPx(value: string | number): number {
  if (typeof value === "number") {
    return value
  }

  if (value.includes("rpx")) {
    return convertRpx(value)
  }
  if (value.includes("px")) {
    return convertPx(value)
  }
  if (value.includes("rem")) {
    return convertRem(value)
  }
  if (value.includes("vw")) {
    return convertVw(value)
  }
  if (value.includes("vh")) {
    return convertVh(value)
  }

  return parseFloat(value)
}
