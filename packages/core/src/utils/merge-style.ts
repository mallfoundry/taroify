import type { CSSProperties } from "react"

export default function mergeStyle(
  style: string | CSSProperties | undefined,
  objectStyle: CSSProperties,
) {
  let styleObject: CSSProperties
  if (typeof style === "string") {
    styleObject = {}
    // biome-ignore lint/complexity/noForEach: <explanation>
    style.split(";").forEach((item) => {
      const [key, value] = item.split(":")
      if (key && value) {
        styleObject[key.trim()] = value.trim()
      }
    })
  } else if (typeof style === "object" && style) {
    styleObject = style
  } else {
    styleObject = {}
  }

  return { ...styleObject, ...objectStyle }
}
