import { createContext } from "react"
import { SidebarTabObject } from "./sidebar-tab.shared"

interface SidebarContextProps {
  value?: any

  onTabClick?(tab: SidebarTabObject): void
}

const SidebarContext = createContext<SidebarContextProps>({})

export default SidebarContext
