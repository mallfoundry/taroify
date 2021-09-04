import { ITouchEvent } from "@tarojs/components"
import { createContext } from "react"

interface TabbarContextProps {
  value?: string | number
  onItemClick?: (event: ITouchEvent, value?: any) => void
}

const TabbarContext = createContext<TabbarContextProps>({})

export default TabbarContext
