import { createContext } from "react"

interface CheckboxGroupContextValue {
  value?: any[]
  max?: number

  onChange?(value: any[]): void
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue>({})

export default CheckboxGroupContext
