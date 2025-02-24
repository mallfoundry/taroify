import { createContext } from "react"
import type { CheckboxGroupDirection } from "./checkbox-group.shared"

interface CheckboxGroupContextValue {
  value?: any[]
  max?: number
  disabled?: boolean
  direction?: CheckboxGroupDirection

  onChange?(value: any[]): void
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue>({})

export default CheckboxGroupContext
