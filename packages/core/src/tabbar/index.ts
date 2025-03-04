import TabbarElement, { type TabbarProps } from "./tabbar"
import TabbarItem from "./tabbar-item"

export type { TabbarThemeVars } from "./tabbar.shared"

interface TabbarInterface {
  (props: TabbarProps): JSX.Element

  TabItem: typeof TabbarItem
}

const Tabbar = TabbarElement as TabbarInterface
Tabbar.TabItem = TabbarItem

export default Tabbar
