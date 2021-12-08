import { createContext, Key } from "react"
import { DropdownMenuDirection } from "./dropdown-menu.shared"

interface DropdownMenuContextValue {
  direction?: DropdownMenuDirection
  itemOffset?: number

  toggleItem?(value?: Key): void

  isItemToggle?(value?: any): boolean | null
}

const DropdownMenuContext = createContext<DropdownMenuContextValue>({})

export default DropdownMenuContext
