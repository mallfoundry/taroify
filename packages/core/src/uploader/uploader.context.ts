import { createContext, type ReactNode } from "react"

interface UploaderContextValue {
  removable?: boolean
  disabled?: boolean
  customUploadButton?: ReactNode
  onUpload?(): void

  onRemove?(): void
}

const UploaderContext = createContext<UploaderContextValue>({})

export default UploaderContext
