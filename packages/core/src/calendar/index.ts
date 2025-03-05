import CalendarComponent, { type CalendarProps } from "./calendar"
import CalendarButton from "./calendar-button"
import CalendarFooter from "./calendar-footer"
import type { CalendarDayObject } from "./calendar.shared"

export type { CalendarType, CalendarDayType, CalendarThemeVars } from "./calendar.shared"

interface CalendarInterface {
  (props: CalendarProps): JSX.Element

  Footer: typeof CalendarFooter
  Button: typeof CalendarButton
}

const Calendar = CalendarComponent as CalendarInterface

Calendar.Footer = CalendarFooter
Calendar.Button = CalendarButton

namespace Calendar {
  export type DayObject = CalendarDayObject
}

export default Calendar
