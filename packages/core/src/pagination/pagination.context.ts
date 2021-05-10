import { createContext } from "react"
import { Page } from "./shared"

interface PaginationContextProps {
  current: number
  limit: number
  totalPage: number
  total: number
  emitClick?: (page: Page) => void
}

const PaginationContext = createContext<PaginationContextProps>({
  current: 0,
  limit: 0,
  totalPage: 0,
  total: 0,
})
export default PaginationContext
