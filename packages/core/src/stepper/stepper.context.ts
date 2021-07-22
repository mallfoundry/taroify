import { createContext } from "react"
import { StepperActionType, StepperActionTypeString } from "./stepper.shared"

interface StepperContextValue {
  value?: number | string
  min?: number
  max?: number
  size?: number | string
  disabled?: boolean
  precision?: number
  longPress?: boolean

  formatValue?(value?: number | string): number | string

  onStep?(action: StepperActionType | StepperActionTypeString): void

  onChange?(value?: number | string): void
}

const StepperContext = createContext<StepperContextValue>({})

export default StepperContext
