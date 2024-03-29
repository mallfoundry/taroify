export type ImageMode =
  | "scaleToFill"
  | "aspectFit"
  | "aspectFill"
  | "widthFix"
  | "heightFix"
  | "top"
  | "bottom"
  | "center"
  | "left"
  | "right"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"

export type ImageShape = "square" | "rounded" | "circle"

export type ImageThemeVars = {
  imagePlaceholderColor?: string
  imagePlaceholderFontSize?: string
  imagePlaceholderIconSize?: string
  imagePlaceholderIconColor?: string
  imagePlaceholderBackgroundColor?: string
}
