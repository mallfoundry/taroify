import TabbarElement, { TabbarProps } from "./tabbar"
import TabbarItem from "./tabbar-item"

interface TabbarInterface {
  (props: TabbarProps): JSX.Element

  TabItem: typeof TabbarItem
}

const Tabbar = TabbarElement as TabbarInterface
Tabbar.TabItem = TabbarItem

export default Tabbar
