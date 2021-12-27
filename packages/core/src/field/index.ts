import { ForwardRefExoticComponent } from "react"
import FieldComponent, { FieldProps } from "./field"

export type {
  FieldLabelAlign,
  FieldMessageAlign,
  FieldValidateTrigger,
  FieldInstance,
  FieldValidError,
} from "./field.shared"

interface FieldInterface extends ForwardRefExoticComponent<FieldProps> {
  (props: FieldProps): JSX.Element
}

const Field = FieldComponent as FieldInterface

export default Field
