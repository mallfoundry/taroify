import { createContext, type ReactNode } from "react"
import type { TreeSelectOptionObject } from "./tree-select.shared"

interface TreeSelectContextValue {
  activeIcon?: ReactNode
  value?: any | any[]

  onOptionClick?(event: TreeSelectOptionObject): void
}

const TreeSelectContext = createContext<TreeSelectContextValue>({})

export default TreeSelectContext
