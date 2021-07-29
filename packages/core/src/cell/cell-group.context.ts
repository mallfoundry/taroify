import { createContext } from "react"

interface CellGroupContextValue {
  clickable?: boolean
}

const CellGroupContext = createContext<CellGroupContextValue>({})

export default CellGroupContext
