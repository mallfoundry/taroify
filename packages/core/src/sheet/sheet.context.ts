import { createContext } from "react"

interface SheetContextProps {
  emitCancel?: () => void
}

const SheetContext = createContext<SheetContextProps>({})
export default SheetContext
