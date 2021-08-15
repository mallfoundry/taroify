import { createContext } from "react"

interface UploaderContextValue {
  disabled?: boolean

  onUpload?(): void

  onRemove?(): void
}

const UploaderContext = createContext<UploaderContextValue>({})

export default UploaderContext
