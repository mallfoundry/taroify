import { createContext } from "react"
import Sidebar from "./sidebar"

interface SidebarContextProps {
  activeKey?: number | string
  emitClick?: (event: Sidebar.TabEvent) => void
}

const SidebarContext = createContext<SidebarContextProps>({})

export default SidebarContext
