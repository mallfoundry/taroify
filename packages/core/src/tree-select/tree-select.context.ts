import { createContext, ReactNode } from "react"
import { TreeSelectOptionObject } from "./tree-select.shared"

interface TreeSelectContextValue {
  activeIcon?: ReactNode
  value?: any | any[]

  onOptionClick?(event: TreeSelectOptionObject): void
}

const TreeSelectContext = createContext<TreeSelectContextValue>({})

export default TreeSelectContext
