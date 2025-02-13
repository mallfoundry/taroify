import { createContext } from "react"

interface PullRefreshContextValue {
  distance: number
  onTouchStart(event: any): void
  onTouchMove(event: any): void
  onTouchEnd(event: any): void
}

const PullRefreshContext = createContext<PullRefreshContextValue>({
  distance: 0,
  onTouchStart: () => {},
  onTouchMove: () => {},
  onTouchEnd: () => {},
})

export default PullRefreshContext
