import TabbarElement, { TabbarProps } from "./tabbar"
import TabbarItem from "./tabbar-item"

interface TabbarInterface {
  (props: TabbarProps): JSX.Element

  Item: typeof TabbarItem
}

const Tabbar = TabbarElement as TabbarInterface
Tabbar.Item = TabbarItem

export default Tabbar
