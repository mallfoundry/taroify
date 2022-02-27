import { createContext } from "react"
import { TimelinePosition } from "./timeline.shared"

interface TimelineContextValue {
  position?: TimelinePosition
}

const TimelineContext = createContext<TimelineContextValue>({})

export default TimelineContext
