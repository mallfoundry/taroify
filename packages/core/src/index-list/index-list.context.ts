import { createContext } from "react"
import { Rect, makeRect } from "../utils/dom/rect"

interface IndexListContextValue {
  sticky?: boolean
  stickyOffsetTop?: number | string
  activeIndex: number | string
  activeArrayedIndex: number

  getListRect(): Rect

  getAnchorRects(): Rect[]
}

const IndexListContext = createContext<IndexListContextValue>({
  activeIndex: -1,
  activeArrayedIndex: -1,
  getListRect: () => makeRect(0, 0),
  getAnchorRects: () => [],
})
export default IndexListContext
