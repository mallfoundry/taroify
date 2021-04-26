import { createContext } from "react"

interface GridContextProps {
  bordered: boolean
  columns: number
  gutter?: number | string
  centered: boolean
  clickable: boolean
  direction?: "horizontal" | "vertical"
  square?: boolean
}

const GridContext = createContext<GridContextProps>({
  bordered: false,
  columns: 0,
  centered: false,
  clickable: false,
})

export default GridContext
