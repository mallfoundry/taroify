import { createContext } from "react"
import { BoundingClientRect, makeBoundingClientRect } from "../utils/rect"

interface IndexBarContextValue {
  sticky?: boolean
  stickyOffsetTop?: number
  zIndex?: number
  highlightColor?: string
  activeIndex: number | string
  activeArrayedIndex: number

  getListRect(): BoundingClientRect

  getAnchorRects(): BoundingClientRect[]
}

const IndexBarContext = createContext<IndexBarContextValue>({
  activeIndex: -1,
  activeArrayedIndex: -1,
  getListRect: () => makeBoundingClientRect(0, 0),
  getAnchorRects: () => [],
})
export default IndexBarContext
