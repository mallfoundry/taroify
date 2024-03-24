import FormFeedback from "../form/form-feedback"
import FormLabel from "../form/form-label"
import FieldComponent from "./field"

type FieldInterface = typeof FieldComponent & {
  Label: typeof FormLabel
  Feedback: typeof FormFeedback
}

const Field = FieldComponent as FieldInterface

Field.Label = FormLabel
Field.Feedback = FormFeedback

export default Field
