import { createContext } from "react"

interface BadgeWrapperContextValue {}

const BadgeWrapperContext = createContext<BadgeWrapperContextValue | undefined>(undefined)

export default BadgeWrapperContext
