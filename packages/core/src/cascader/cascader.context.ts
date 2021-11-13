import { ITouchEvent } from "@tarojs/components"
import { createContext, ReactNode } from "react"

interface CascaderContextValue {
  title?: ReactNode
  closeable?: boolean
  closeIcon?: ReactNode

  onClose?(event: ITouchEvent): void
}

const CascaderContext = createContext<CascaderContextValue>({})

export default CascaderContext
