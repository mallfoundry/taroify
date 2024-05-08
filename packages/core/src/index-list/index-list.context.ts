import { createContext } from "react"
import { Rect, makeRect } from "../utils/dom/rect"

interface IndexListContextValue {
  sticky?: boolean
  stickyOffsetTop?: number | string
  activeIndex: number | string
  inner: boolean
  activeArrayedIndex: number

  getListRect(): Rect

  getAnchorRects(): Rect[]

  getFirstAnchorTop(): number
}

const IndexListContext = createContext<IndexListContextValue>({
  activeIndex: -1,
  activeArrayedIndex: -1,
  inner: false,
  getListRect: () => makeRect(0, 0),
  getAnchorRects: () => [],
  getFirstAnchorTop: () => 0,
})
export default IndexListContext
