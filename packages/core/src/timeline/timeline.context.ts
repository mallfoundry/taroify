import { createContext } from "react"
import type { TimelinePosition } from "./timeline.shared"

interface TimelineContextValue {
  position?: TimelinePosition
}

const TimelineContext = createContext<TimelineContextValue>({})

export default TimelineContext
