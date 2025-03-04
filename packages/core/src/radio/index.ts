import { default as RadioComponent, type RadioProps } from "./radio"
import RadoGroup from "./radio-group"

export type { RadioProps } from "./radio"
export type { RadioGroupProps } from "./radio-group"

export type { RadioThemeVars } from "./radio.shared"

interface RadioInterface {
  (props: RadioProps): JSX.Element

  Group: typeof RadoGroup
}

const Radio = RadioComponent as RadioInterface

Radio.Group = RadoGroup

export default Radio
