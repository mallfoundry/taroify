import { AreaFormatter } from "@taroify/hooks/use-area"
import { createContext } from "react"

interface AreaPickerContextValue {
  depth?: number
  formatter?: AreaFormatter
}

const AreaPickerContext = createContext<AreaPickerContextValue>({})

export default AreaPickerContext
