import { createContext } from "react"

export interface TabOffset {
  left?: number
  width?: number
}

interface TabsContextProps {
  navOffset?: TabOffset
  tabOffsets?: TabOffset[]
}

const TabsContext = createContext<TabsContextProps>({})

export default TabsContext
