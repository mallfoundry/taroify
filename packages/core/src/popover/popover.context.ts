import { createContext } from "react"

interface PopoverContextValue {}

const PopoverContext = createContext<PopoverContextValue>({})

export default PopoverContext
