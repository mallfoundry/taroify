import { createContext } from "react"
import { DropdownMenuOptionEvent, DropdownMenuValue } from "./dropdown-menu.shared"

interface DropdownMenuItemContextValue {
  toggleOption?: (event: DropdownMenuOptionEvent) => void
  isOptionToggle?: (value?: DropdownMenuValue) => boolean
}

const DropdownMenuItemContext = createContext<DropdownMenuItemContextValue>({})

export default DropdownMenuItemContext
