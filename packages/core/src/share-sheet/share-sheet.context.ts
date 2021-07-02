import { createContext } from "react"
import ShareSheet from "./share-sheet"

interface ShareSheetContextValue {
  emitSelect?: (event: ShareSheet.OptionEvent) => void
}

const ShareSheetContext = createContext<ShareSheetContextValue>({})

export default ShareSheetContext
