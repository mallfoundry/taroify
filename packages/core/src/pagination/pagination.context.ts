import { createContext } from "react"
import { Page } from "./pagination.shared"

interface PaginationContextValue {
  current: number
  count: number
  siblingCount: number
  emitClick?: (page: Page) => void
}

const PaginationContext = createContext<PaginationContextValue>({
  current: 0,
  count: 0,
  siblingCount: 0,
})
export default PaginationContext
