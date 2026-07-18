export type TextareaThemeVars = {
  textareaLineHeight?: string
  textareaFontSize?: string
  textareaColor?: string
  textareaPlaceholderColor?: string
  textareaReadonlyColor?: string
  textareaLimitColor?: string
  textareaLimitFontSize?: string
  textareaLimitLineHeight?: string
}

export function getStringLength(chars = "") {
  return chars.normalize().length
}

export function truncateString(chars: string, maxlength: number) {
  if (maxlength < 0 || getStringLength(chars) <= maxlength) {
    return chars
  }

  let value = ""
  for (const char of chars) {
    const nextValue = value + char
    if (getStringLength(nextValue) > maxlength) {
      break
    }
    value = nextValue
  }
  return value
}
