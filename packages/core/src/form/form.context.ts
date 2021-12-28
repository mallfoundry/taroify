import { createContext } from "react"
import { FormValidateTrigger } from "./form.shared"

interface FormContextValue {
  name: string
  validateTrigger?: FormValidateTrigger
}

const FormContext = createContext<FormContextValue>({
  name: "",
})

export default FormContext
