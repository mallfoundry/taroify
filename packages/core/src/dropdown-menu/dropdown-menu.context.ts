import { createContext, type Key } from "react"
import type { DropdownMenuDirection } from "./dropdown-menu.shared"

interface DropdownMenuContextValue {
  direction?: DropdownMenuDirection
  itemOffset?: number
  backdropType?: "inner" | "outer"

  toggleItem?(value?: Key): void

  isItemToggle?(value?: any): boolean | null
}

const DropdownMenuContext = createContext<DropdownMenuContextValue>({})

export default DropdownMenuContext
