import SidebarElement, { SidebarProps } from "./sidebar"
import SidebarTab from "./sidebar-tab"
import { SidebarTabObject } from "./sidebar-tab.shared"

interface SidebarInterface {
  (props: SidebarProps): JSX.Element

  Tab: typeof SidebarTab
}

const Sidebar = SidebarElement as SidebarInterface
Sidebar.Tab = SidebarTab

// eslint-disable-next-line @typescript-eslint/no-redeclare
namespace Sidebar {
  export type TabObject = SidebarTabObject
}

export default Sidebar
