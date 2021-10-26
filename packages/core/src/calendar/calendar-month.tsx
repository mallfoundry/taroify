import { View } from "@tarojs/components"
import * as _ from "lodash"
import * as React from "react"
import {
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"
import { useHeight } from "../hooks"
import { prefixClassname } from "../styles"
import { getRect } from "../utils/dom/rect"
import CalendarDay from "./calendar-day"
import CalendarContext from "./calendar.context"
import {
  CalendarDayObject,
  CalendarDayType,
  compareDate,
  createNextDay,
  createPreviousDay,
  getEndDayOfMonth,
} from "./calendar.shared"

interface CalendarMonthWatermarkProps {
  children?: ReactNode
}

function CalendarMonthWatermark(props: CalendarMonthWatermarkProps) {
  const { children } = props
  return <View className={prefixClassname("calendar__month-watermark")} children={children} />
}

export interface CalendarMonthInstance {
  disabledDays: CalendarDayObject[]

  getTitle(): any

  getHeight(): number

  setVisible(value?: boolean | undefined): void

  getScrollTop(): Promise<number>
}

interface CalendarMonthProps {
  value?: Date
  subtitle?: boolean
  readonly?: boolean
  watermark?: boolean
  lazyRender?: boolean
  children?: ReactNode
}

const CalendarMonth = forwardRef<CalendarMonthInstance, CalendarMonthProps>(
  (props: CalendarMonthProps, ref) => {
    const { value: monthValue = new Date(), watermark, lazyRender, subtitle } = props
    const { type, firstDayOfWeek, min, max, value: currentValue } = useContext(CalendarContext)

    const monthRef = useRef()
    const daysRef = useRef()

    const height = useHeight(monthRef)
    const [visible, setVisible] = useState<boolean | undefined>(false)

    const shouldRender = useMemo(() => visible && !lazyRender, [lazyRender, visible])

    const month = useMemo(() => ((monthValue as Date)?.getMonth() ?? 0) + 1, [monthValue])

    const offset = useMemo(() => {
      const realDay = monthValue.getDay()
      if (firstDayOfWeek) {
        return (realDay + 7 - firstDayOfWeek) % 7
      }
      return realDay
    }, [firstDayOfWeek, monthValue])

    const totalDay = useMemo(
      () => getEndDayOfMonth(monthValue.getFullYear(), monthValue.getMonth() + 1),
      [monthValue],
    )

    const placeholders = useMemo<CalendarDayObject[]>(() => {
      const count = Math.ceil((totalDay + offset) / 7)
      return Array(count).fill({ type: "placeholder" })
    }, [offset, totalDay])

    const getMultipleDayType = useCallback(
      (day: Date) => {
        const isActive = (date: Date) =>
          _.some(currentValue as Date[], (item) => compareDate(item, date) === 0)

        if (isActive(day)) {
          const prevDay = createPreviousDay(day)
          const nextDay = createNextDay(day)
          const prevActive = isActive(prevDay)
          const nextActive = isActive(nextDay)

          if (prevActive && nextActive) {
            return "middle"
          }
          if (prevActive) {
            return "end"
          }
          if (nextActive) {
            return "start"
          }
          return "active"
        }

        return ""
      },
      [currentValue],
    )

    const getRangeDayType = useCallback(
      (day: Date) => {
        const [startDay, endDay] = currentValue as Date[]

        if (!startDay) {
          return ""
        }

        const compareToStart = compareDate(day, startDay)

        if (!endDay) {
          return compareToStart === 0 ? "start" : ""
        }

        const compareToEnd = compareDate(day, endDay)

        if (/*props.allowSameDay && */ compareToStart === 0 && compareToEnd === 0) {
          return "active"
        }
        if (compareToStart === 0) {
          return "start"
        }
        if (compareToEnd === 0) {
          return "end"
        }
        if (compareToStart > 0 && compareToEnd < 0) {
          return "middle"
        }

        return ""
      },
      [currentValue],
    )

    const getDayType = useCallback(
      (dayValue: Date): CalendarDayType => {
        if (compareDate(dayValue, min) < 0 || compareDate(dayValue, max) > 0) {
          return "disabled"
        }

        if (Array.isArray(currentValue)) {
          if (type === "multiple") {
            return getMultipleDayType(dayValue)
          }
          if (type === "range") {
            return getRangeDayType(dayValue)
          }
        } else if (type === "single") {
          return compareDate(dayValue, currentValue as Date) === 0 ? "active" : ""
        }

        return ""
      },
      [currentValue, getMultipleDayType, getRangeDayType, max, min, type],
    )

    const days = useMemo<CalendarDayObject[]>(() => {
      const days: CalendarDayObject[] = []
      const year = monthValue?.getFullYear()
      const month = monthValue?.getMonth()

      for (let dayValue = 1; dayValue <= totalDay; dayValue++) {
        const dateValue = new Date(year, month, dayValue)
        const type = getDayType(dateValue)
        const object: CalendarDayObject = {
          value: dateValue,
          type,
          children: dayValue,
        }
        days.push(object)
      }
      return days
    }, [getDayType, totalDay, monthValue])

    const disabledDays = useMemo<CalendarDayObject[]>(
      () => days.filter((day) => day.type === "disabled"),
      [days],
    )

    const getScrollTop = useCallback(
      () => getRect(subtitle ? daysRef : monthRef).then(({ top }) => top),
      [subtitle],
    )

    useImperativeHandle(
      ref,
      () => ({
        getScrollTop,
        disabledDays,
        setVisible,
        getHeight: () => height,
        getTitle: () => "2021年" + month + "月",
      }),
      [disabledDays, getScrollTop, height, month],
    )

    const content = useMemo(
      () =>
        _.map(shouldRender ? days : placeholders, (day, index) => (
          <CalendarDay
            key={shouldRender ? day.value.getTime() : index}
            style={{ marginLeft: index === 0 ? `${(100 * offset) / 7}%` : "" }}
            value={day.value}
            type={day.type}
            children={day.children}
          />
        )),
      [days, offset, placeholders, shouldRender],
    )

    return (
      <View ref={monthRef} className={prefixClassname("calendar__month")}>
        {subtitle && (
          <View
            className={prefixClassname("calendar__month-title")}
            children={`${monthValue.getFullYear()}年${month}月`}
          />
        )}
        <View ref={daysRef} className={prefixClassname("calendar__days")}>
          {watermark && shouldRender && <CalendarMonthWatermark children={month} />}
          {content}
        </View>
      </View>
    )
  },
)

export default CalendarMonth
