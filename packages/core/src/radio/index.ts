import { default as RadioElement, RadioProps } from "./radio"
import RadoGroup from "./radio-group"

interface RadioInterface {
  (props: RadioProps): JSX.Element

  Group: typeof RadoGroup
}

const Radio = RadioElement as RadioInterface

Radio.Group = RadoGroup

export default Radio
