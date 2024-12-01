import * as _ from "lodash"

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

export function getStringLength(chars: string = "") {
  return chars.normalize().length
}
