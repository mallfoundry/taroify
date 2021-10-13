import { createContext } from "react"
import { StepsDirection } from "./steps.shared"

interface StepsContextValue {
  value?: number
  direction?: StepsDirection
  alternativeLabel?: boolean
}

const StepsContext = createContext<StepsContextValue>({})
export default StepsContext
