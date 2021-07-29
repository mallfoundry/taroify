import { CheckboxProps, default as CheckboxElement } from "./checkbox"
import CheckboxGroup from "./checkbox-group"

interface CheckboxInterface {
  (props: CheckboxProps): JSX.Element

  Group: typeof CheckboxGroup
}

const Checkbox = CheckboxElement as CheckboxInterface

Checkbox.Group = CheckboxGroup

export default Checkbox
