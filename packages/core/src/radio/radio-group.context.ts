import { createContext } from "react"
import { RadioGroupDirection } from "./radio-group.shared"

interface RadioGroupContextValue {
  value?: any
  disabled?: boolean
  direction?: RadioGroupDirection
  size?: number

  onChange?(value: any): void
}

const RadioGroupContext = createContext<RadioGroupContextValue>({})

export default RadioGroupContext
