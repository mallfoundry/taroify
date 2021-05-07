import { createContext } from "react"
import ActionSheet from "./action-sheet"

interface ActionSheetContextProps {
  emitSelect?: (event: ActionSheet.ActionEvent) => void
}

const ActionSheetContext = createContext<ActionSheetContextProps>({})

export default ActionSheetContext
