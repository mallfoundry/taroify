import { CSSProperties } from "react"
import { IconColor, IconColorString, IconSize, IconSizeString } from "./Icon"

export interface NamedIconProps {
  className?: string
  style?: CSSProperties
  size?: IconSize | IconSizeString
  color?: IconColor | IconColorString
}
