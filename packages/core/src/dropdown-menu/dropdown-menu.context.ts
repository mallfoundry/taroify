import { createContext } from "react"
import { DropdownMenuDirection, DropdownMenuKey } from "./dropdown-menu.shared"

interface DropdownMenuContextValue {
  activeColor?: string
  direction?: DropdownMenuDirection
  itemOffset?: number
  toggleItem?: (options: { dataKey?: DropdownMenuKey; disabled?: boolean }) => void
  isItemToggle?: (key?: DropdownMenuKey) => boolean | undefined
}

const DropdownMenuContext = createContext<DropdownMenuContextValue>({})

export default DropdownMenuContext
