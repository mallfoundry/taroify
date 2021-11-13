import { createContext } from "react"

interface FlexContextValue {
  gutter: [number | undefined, number | undefined]
}

const FlexContext = createContext<FlexContextValue>({
  gutter: [undefined, undefined],
})

export default FlexContext
