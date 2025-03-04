import TabPane from "./tab-pane"
import TabsElement, { type TabsProps } from "./tabs"
import type { TabEvent as SharedTabEvent } from "./tabs.shared"

export type { TabThemeVars } from "./tabs.shared"

interface TabsInterface {
  (props: TabsProps): JSX.Element

  TabPane: typeof TabPane
}

const Tabs = TabsElement as TabsInterface

Tabs.TabPane = TabPane

namespace Tabs {
  export type TabEvent = SharedTabEvent
}

export default Tabs
