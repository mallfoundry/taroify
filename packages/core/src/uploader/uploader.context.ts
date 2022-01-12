import { createContext } from "react"

interface UploaderContextValue {
  removable?: boolean
  disabled?: boolean

  onUpload?(): void

  onRemove?(): void
}

const UploaderContext = createContext<UploaderContextValue>({})

export default UploaderContext
