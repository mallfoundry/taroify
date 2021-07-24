import { createContext, ReactNode } from "react"

interface RateContextValue {
  voidIcon?: ReactNode
  fullIcon?: ReactNode
  halfIcon?: ReactNode
}

const RateContext = createContext<RateContextValue>({})

export default RateContext
