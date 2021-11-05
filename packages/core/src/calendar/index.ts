import CalendarComponent, { CalendarProps } from "./calendar"
import CalendarButton from "./calendar-button"
import CalendarFooter from "./calendar-footer"
import { CalendarDayObject } from "./calendar.shared"

export type { CalendarType, CalendarDayType } from "./calendar.shared"

interface CalendarInterface {
  (props: CalendarProps): JSX.Element

  Footer: typeof CalendarFooter
  Button: typeof CalendarButton
}

const Calendar = CalendarComponent as CalendarInterface

Calendar.Footer = CalendarFooter
Calendar.Button = CalendarButton

// eslint-disable-next-line @typescript-eslint/no-redeclare
namespace Calendar {
  export type DayObject = CalendarDayObject
}

export default Calendar
