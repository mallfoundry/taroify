import { createContext } from "react"

interface TabbarContextProps {
  activeKey?: string | number
  activeColor?: string
  inactiveColor?: string
  emitClick?: (activeKey?: string | number) => void
}

const TabbarContext = createContext<TabbarContextProps>({})

export default TabbarContext
