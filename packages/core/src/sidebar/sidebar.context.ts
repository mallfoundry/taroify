import { createContext } from "react"
import type { SidebarTabObject } from "./sidebar-tab.shared"

interface SidebarContextProps {
  value?: any

  onTabClick?(tab: SidebarTabObject): void
}

const SidebarContext = createContext<SidebarContextProps>({})

export default SidebarContext
