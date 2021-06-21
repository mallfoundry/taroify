import { createContext, ReactNode } from "react"
import { TreeSelectOptionEvent, TreeSelectOptionValue } from "./tree-select.shared"

interface TreeSelectContextValue {
  activeIcon?: ReactNode

  hasValuesActive?(value: TreeSelectOptionValue): boolean

  changeValuesActive?(event: TreeSelectOptionEvent): void
}

const TreeSelectContext = createContext<TreeSelectContextValue>({})

export default TreeSelectContext
