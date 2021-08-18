import TabPane from "./tab-pane"
import TabsElement, { TabsProps } from "./tabs"
import { TabEvent as SharedTabEvent, TabKey as SharedTabKey } from "./tabs.shared"

interface TabsInterface {
  (props: TabsProps): JSX.Element

  TabPane: typeof TabPane
}

const Tabs = TabsElement as TabsInterface

Tabs.TabPane = TabPane

// eslint-disable-next-line @typescript-eslint/no-redeclare
namespace Tabs {
  export type TabEvent = SharedTabEvent

  export type TabKey = SharedTabKey
}

export default Tabs
