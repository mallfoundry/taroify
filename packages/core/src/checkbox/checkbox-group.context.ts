import { createContext } from "react"
import { CheckboxGroupDirection } from "./checkbox-group.shared"

interface CheckboxGroupContextValue {
  value?: any[]
  max?: number

  direction?: CheckboxGroupDirection

  onChange?(value: any[]): void
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue>({})

export default CheckboxGroupContext
