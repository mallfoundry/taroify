import { createContext } from "react"

interface PullRefreshContextValue {
  distance: number
}

const PullRefreshContext = createContext<PullRefreshContextValue>({
  distance: 0,
})

export default PullRefreshContext
