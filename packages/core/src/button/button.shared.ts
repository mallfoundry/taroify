export type ButtonFormType = "button" | "submit" | "reset"

export type ButtonVariant = "contained" | "text" | "outlined"

export type ButtonSize = "mini" | "small" | "medium" | "large"

export const buttonPresetColors = [
  "default",
  "primary",
  "info",
  "success",
  "warning",
  "danger",
] as const

export type ButtonPresetColor = (typeof buttonPresetColors)[number]

export type ButtonColor = ButtonPresetColor | (string & {})

export type ButtonShape = "square" | "round"

export type IconPosition = "left" | "right"

export function isButtonPresetColor(color: ButtonColor): color is ButtonPresetColor {
  return buttonPresetColors.includes(color as ButtonPresetColor)
}

export type ButtonThemeVars = {
  buttonLineHeight?: string
  buttonBorderWidth?: string
  buttonBorderRadius?: string
  buttonBorderRadiusMax?: string
  buttonTransitionDuration?: string
  buttonActiveOpacity?: string
  buttonDisabledOpacity?: string
  buttonOutlinedBackgroundColor?: string
  buttonFocusVisibleOutline?: string
  buttonFocusVisibleOutlineOffset?: string
  buttonIconSize?: string
  buttonContentGap?: string
  buttonLoadingIconSize?: string
  buttonHeightMini?: string
  buttonPaddingMini?: string
  buttonFontSizeMini?: string
  buttonHeightSmall?: string
  buttonPaddingSmall?: string
  buttonFontSizeSmall?: string
  buttonHeightMedium?: string
  buttonPaddingMedium?: string
  buttonFontSizeMedium?: string
  buttonHeightLarge?: string
  buttonFontSizeLarge?: string
  buttonDefaultColor?: string
  buttonDefaultBackgroundColor?: string
  buttonDefaultBorderColor?: string
  buttonPrimaryColor?: string
  buttonPrimaryBackgroundColor?: string
  buttonPrimaryBorderColor?: string
  buttonInfoColor?: string
  buttonInfoBackgroundColor?: string
  buttonInfoBorderColor?: string
  buttonSuccessColor?: string
  buttonSuccessBackgroundColor?: string
  buttonSuccessBorderColor?: string
  buttonWarningColor?: string
  buttonWarningBackgroundColor?: string
  buttonWarningBorderColor?: string
  buttonDangerColor?: string
  buttonDangerBackgroundColor?: string
  buttonDangerBorderColor?: string
}
