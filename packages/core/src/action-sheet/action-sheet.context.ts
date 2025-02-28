import { createContext } from "react"
import type { ActionSheetActionObject } from "./action-sheet.shared"

interface ActionSheetContextProps {
  onSelect?: (object: ActionSheetActionObject) => void
}

const ActionSheetContext = createContext<ActionSheetContextProps>({})

export default ActionSheetContext
