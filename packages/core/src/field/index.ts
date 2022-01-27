import { FunctionComponent } from "react"
import FormFeedback from "../form/form-feedback"
import FormLabel from "../form/form-label"
import FieldComponent, { FieldProps } from "./field"

interface FieldInterface extends FunctionComponent<FieldProps> {
  Label: typeof FormLabel
  Feedback: typeof FormFeedback
}

const Field = FieldComponent as FieldInterface

Field.Label = FormLabel
Field.Feedback = FormFeedback

export default Field
