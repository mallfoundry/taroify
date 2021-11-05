import { createContext, ReactNode } from "react"
import {
  CalendarDayObject,
  CalendarType,
  CalendarValueType,
  MAX_DATE,
  MIN_DATE,
} from "./calendar.shared"

interface CalendarContextValue {
  type: CalendarType
  subtitle?: ReactNode
  firstDayOfWeek: number
  value?: CalendarValueType
  min: Date
  max: Date

  formatter?(day: CalendarDayObject): CalendarDayObject

  onDayClick?(day: CalendarDayObject): void

  notifyConfirm?(confirm: boolean): void

  onConfirm?(): void
}

const CalendarContext = createContext<CalendarContextValue>({
  type: "single",
  firstDayOfWeek: 0,
  min: MIN_DATE,
  max: MAX_DATE,
})

export default CalendarContext
