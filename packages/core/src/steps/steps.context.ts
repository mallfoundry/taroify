import { createContext } from "react"
import { StepsDirection } from "./steps.shared"

interface StepsContextValue {
  activeStep?: number
  activeColor?: string
  inactiveColor?: string
  direction?: StepsDirection
  alternativeLabel?: boolean
}

const StepsContext = createContext<StepsContextValue>({})
export default StepsContext
