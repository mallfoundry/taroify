import { createContext } from "react"

interface CollapseContextValue {
  isExpanded?: (dataKey: number | string) => boolean
  toggleItem?: (dataKey: number | string, expanded: boolean) => void
}

const CollapseContext = createContext<CollapseContextValue>({})

export default CollapseContext
