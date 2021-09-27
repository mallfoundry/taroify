import { createContext } from "react"
import { TabEvent, TabKey, TabObject, TabsTheme, TabsThemeString } from "./tabs.shared"

interface TabsContextValue {
  activeKey: TabKey
  duration?: number
  lazyRender: boolean
  animated: boolean
  swipeable: boolean
  theme?: TabsTheme | TabsThemeString
  bordered?: boolean
  ellipsis?: boolean
  tabObjects: TabObject[]

  onTabClick?(event: TabEvent): void
}

const TabsContext = createContext<TabsContextValue>({
  activeKey: undefined,
  lazyRender: true,
  animated: false,
  swipeable: false,
  tabObjects: [],
})

export default TabsContext
