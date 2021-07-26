import { createContext, ReactNode } from "react"

interface RateContextValue {
  gutter?: number
  count?: number
  icon?: ReactNode
  emptyIcon?: ReactNode
}

const RateContext = createContext<RateContextValue>({})

export default RateContext
