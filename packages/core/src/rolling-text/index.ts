import type { ForwardRefExoticComponent, ReactElement } from "react"
import RollingTextComponent, { type RollingTextProps } from "./rolling-text"

export type { RollingTextRef } from "./rolling-text"

export type { RollingTextThemeVars } from "./rolling-text.shared"

interface RollingTextInterface extends ForwardRefExoticComponent<RollingTextProps> {
  (props: RollingTextProps): ReactElement
}

const RollingText = RollingTextComponent as RollingTextInterface

export default RollingText
