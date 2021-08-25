import FieldElement, { FieldProps } from "./field"
import FieldButton from "./field-button"

export type { FieldClearTrigger, FieldClearTriggerString } from "./field.shared"

interface FieldInterface {
  (props: FieldProps): JSX.Element

  Button: typeof FieldButton
}

const Field = FieldElement as FieldInterface
Field.Button = FieldButton

export default Field
