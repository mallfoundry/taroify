import SidebarElement, { type SidebarProps } from "./sidebar"
import SidebarTab from "./sidebar-tab"
import type { SidebarTabObject } from "./sidebar-tab.shared"

export type { SidebarThemeVars } from "./sidebar.shared"

interface SidebarInterface {
  (props: SidebarProps): JSX.Element

  Tab: typeof SidebarTab
}

const Sidebar = SidebarElement as SidebarInterface
Sidebar.Tab = SidebarTab

namespace Sidebar {
  export type TabObject = SidebarTabObject
}

export default Sidebar
