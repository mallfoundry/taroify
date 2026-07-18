import { createContext } from "react"

interface PullRefreshContextValue {
  distance: number
  updateReachTop(reachTop: boolean): void
  onTouchStart(event: any): void
  onTouchMove(event: any): void
  onTouchEnd(event: any): void
}

const PullRefreshContext = createContext<PullRefreshContextValue>({
  distance: 0,
  updateReachTop: () => {},
  onTouchStart: () => {},
  onTouchMove: () => {},
  onTouchEnd: () => {},
})

export default PullRefreshContext
