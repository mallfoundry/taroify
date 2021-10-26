import { createContext } from "react"
import { CalendarDayObject, CalendarType, MAX_DATE, MIN_DATE } from "./calendar.shared"

interface CalendarContextValue {
  type: CalendarType
  firstDayOfWeek: number
  value?: Date | Date[]
  min: Date
  max: Date
  subtitle?: boolean

  onDayClick?(day: CalendarDayObject): void
}

const CalendarContext = createContext<CalendarContextValue>({
  type: "single",
  firstDayOfWeek: 0,
  min: MIN_DATE,
  max: MAX_DATE,
})

export default CalendarContext
