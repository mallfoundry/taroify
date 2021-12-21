import { ForwardRefExoticComponent } from "react"
import FieldComponent, { FieldProps } from "./field"
import FieldButton from "./field-button"

export type {
  FieldLabelAlign,
  FieldInputAlign,
  FieldMessageAlign,
  FieldClearTrigger,
  FieldValidateTrigger,
  FieldInstance,
} from "./field.shared"

interface FieldInterface extends ForwardRefExoticComponent<FieldProps> {
  (props: FieldProps): JSX.Element

  Button: typeof FieldButton
}

const Field = FieldComponent as FieldInterface
Field.Button = FieldButton

export default Field
