import { createContext } from "react"
import { TabObject, TabsTheme } from "./tabs.shared"

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
  swipeThreshold?: number
  tabObjects: TabObject[]
}

const TabsContext = createContext<TabsContextValue>({
  value: undefined,
  lazyRender: true,
  animated: false,
  swipeable: false,
  swipeThreshold: 5,
  tabObjects: [],
})

export default TabsContext
