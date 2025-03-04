import { createContext } from "react"
import type { ShareSheetOptionObject } from "./share-sheet.shared"

interface ShareSheetContextValue {
  onSelect?(event: ShareSheetOptionObject): void
}

const ShareSheetContext = createContext<ShareSheetContextValue>({})

export default ShareSheetContext
