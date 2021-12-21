import { createContext } from "react"
import { FieldValidateTrigger } from "../field"

interface FormContextValue {
  name: string
  validateTrigger?: FieldValidateTrigger
}

const FormContext = createContext<FormContextValue>({
  name: "",
})

export default FormContext
