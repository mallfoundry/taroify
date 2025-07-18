import TabPanel from "./tab-panel"
import TabsElement, { type TabsProps } from "./tabs"
import type { TabEvent as SharedTabEvent } from "./tabs.shared"

export type { TabThemeVars } from "./tabs.shared"

interface TabsInterface {
  (props: TabsProps): JSX.Element

  TabPane: typeof TabPanel
  TabPanel: typeof TabPanel
}

const Tabs = TabsElement as TabsInterface

Tabs.TabPane = TabPanel
Tabs.TabPanel = TabPanel

namespace Tabs {
  export type TabEvent = SharedTabEvent
}

export default Tabs
