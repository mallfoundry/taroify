import { createContext } from "react"
import { BoundingClientRect, makeBoundingClientRect } from "../utils/rect"

interface IndexListContextValue {
  sticky?: boolean
  stickyOffsetTop?: number
  zIndex?: number
  activeIndex: number | string
  activeArrayedIndex: number

  getListRect(): BoundingClientRect

  getAnchorRects(): BoundingClientRect[]
}

const IndexListContext = createContext<IndexListContextValue>({
  activeIndex: -1,
  activeArrayedIndex: -1,
  getListRect: () => makeBoundingClientRect(0, 0),
  getAnchorRects: () => [],
})
export default IndexListContext
