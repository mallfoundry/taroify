import { createContext } from "react"

interface BadgeWrapperContextValue {}

const BadgeWrapperContext = createContext<BadgeWrapperContextValue>({})

export default BadgeWrapperContext
