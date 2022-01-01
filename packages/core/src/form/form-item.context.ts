import { createContext } from "react"
import { FormValidateStatus } from "./form.shared"

interface FormItemContextValue {
  validateStatus?: FormValidateStatus
}

const FormItemContext = createContext<FormItemContextValue>({})

export default FormItemContext
