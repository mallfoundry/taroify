import { createContext } from "react"
import { DropdownMenuOptionEvent } from "./dropdown-menu.shared"

interface DropdownMenuItemContextValue {
  toggleOption?(event: DropdownMenuOptionEvent): void

  isOptionToggle?(value?: any | any[]): boolean
}

const DropdownMenuItemContext = createContext<DropdownMenuItemContextValue>({})

export default DropdownMenuItemContext
