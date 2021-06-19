import { createContext } from "react"
import { SidebarTabEvent, SidebarTabKey } from "./sidebar-tab.shared"

interface SidebarContextProps {
  isTabActive?(key: SidebarTabKey): boolean

  changeTab?(event: SidebarTabEvent): void
}

const SidebarContext = createContext<SidebarContextProps>({})

export default SidebarContext
