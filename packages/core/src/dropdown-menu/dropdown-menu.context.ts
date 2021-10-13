import { createContext, Key } from "react"
import { DropdownMenuDirection } from "./dropdown-menu.shared"

interface DropdownMenuContextValue {
  direction?: DropdownMenuDirection
  itemOffset?: number
  toggleItem?: (options: { dataKey?: Key; disabled?: boolean }) => void
  isItemToggle?: (value?: any) => boolean | undefined
}

const DropdownMenuContext = createContext<DropdownMenuContextValue>({})

export default DropdownMenuContext
