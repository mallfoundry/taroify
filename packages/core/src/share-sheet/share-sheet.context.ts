import { createContext } from "react"
import ShareSheet from "./share-sheet"

interface ShareSheetContextProps {
  emitSelect?: (event: ShareSheet.OptionEvent) => void
}

const ShareSheetContext = createContext<ShareSheetContextProps>({})

export default ShareSheetContext
