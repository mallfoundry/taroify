import { createContext } from "react"
import { RadioGroupDirection, RadioGroupDirectionString } from "./radio-group.shared"

interface RadioGroupContextValue {
  value?: any
  disabled?: boolean
  direction?: RadioGroupDirection | RadioGroupDirectionString
  size?: number

  onChange?(value: any): void
}

const RadioGroupContext = createContext<RadioGroupContextValue>({})

export default RadioGroupContext
