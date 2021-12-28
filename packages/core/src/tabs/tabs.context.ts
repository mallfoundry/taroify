import { createContext } from "react"
import { TabEvent, TabObject, TabsTheme } from "./tabs.shared"

interface TabsContextValue {
  index?: number
  value: any
  duration?: number
  lazyRender: boolean
  animated: boolean
  swipeable: boolean
  theme?: TabsTheme
  bordered?: boolean
  ellipsis?: boolean
  tabObjects: TabObject[]

  onTabClick?(event: TabEvent): void
}

const TabsContext = createContext<TabsContextValue>({
  value: undefined,
  lazyRender: true,
  animated: false,
  swipeable: false,
  tabObjects: [],
})

export default TabsContext
