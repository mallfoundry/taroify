import { createContext } from "react"
import { Page } from "./pagination.shared"

interface PaginationContextProps {
  current: number
  count: number
  siblingCount: number
  emitClick?: (page: Page) => void
}

const PaginationContext = createContext<PaginationContextProps>({
  current: 0,
  count: 0,
  siblingCount: 0,
})
export default PaginationContext
