import { CheckboxProps, default as CheckboxComponent } from "./checkbox"
import CheckboxGroup from "./checkbox-group"

export type { CheckboxProps } from "./checkbox"
export type { CheckboxGroupProps } from "./checkbox-group"

interface CheckboxInterface {
  (props: CheckboxProps): JSX.Element

  Group: typeof CheckboxGroup
}

const Checkbox = CheckboxComponent as CheckboxInterface

Checkbox.Group = CheckboxGroup

export default Checkbox
