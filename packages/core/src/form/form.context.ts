import { createContext } from "react"
import { FormControlAlign, FormLabelAlign, FormValidateTrigger } from "./form.shared"

interface FormContextValue {
  name?: string
  colon?: boolean
  labelAlign?: FormLabelAlign
  controlAlign?: FormControlAlign
  validateTrigger?: FormValidateTrigger
}

const FormContext = createContext<FormContextValue>({})

export default FormContext
