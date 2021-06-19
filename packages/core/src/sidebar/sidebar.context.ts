import { createContext } from "react"
import { SidebarTabEvent } from "./sidebar-tab.shared"

interface SidebarContextProps {
  activeKey?: number | string
  emitClick?: (event: SidebarTabEvent) => void
}

const SidebarContext = createContext<SidebarContextProps>({})

export default SidebarContext
