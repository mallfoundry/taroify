import { createContext } from "react"

interface TabbarContextProps {
  value?: string | number
  onItemClick?: (value?: any) => void
}

const TabbarContext = createContext<TabbarContextProps>({})

export default TabbarContext
