import { createContext } from "react"
import { SheetItemObject } from "./sheet.shared"

interface SheetContextProps {
  onSelect?(item: SheetItemObject): void

  onCancel?(): void
}

const SheetContext = createContext<SheetContextProps>({})
export default SheetContext
