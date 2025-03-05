export function addUnitPx(value?: string | number): string {
  return value === undefined ? "" : `${unitToPx(value)}px`
}

// cache
let rootFontSize: number

function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize

    rootFontSize = Number.parseFloat(fontSize)
  }

  return rootFontSize
}

function convertPx(value: string) {
  const valueCache = value.replace(/px/g, "")
  return +valueCache
}

function convertRem(value: string) {
  const valueCache = value.replace(/rem/g, "")
  return +valueCache * getRootFontSize()
}

function convertVw(value: string) {
  const valueCache = value.replace(/vw/g, "")
  return (+valueCache * window.innerWidth) / 100
}

function convertVh(value: string) {
  const valueCache = value.replace(/vh/g, "")
  return (+valueCache * window.innerHeight) / 100
}

export function unitToPx(value: string | number): number {
  if (typeof value === "number") {
    return value
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

  return Number.parseFloat(value)
}
