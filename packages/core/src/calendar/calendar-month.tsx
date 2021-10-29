import { View } from "@tarojs/components"
import { nextTick } from "@tarojs/taro"
import * as _ from "lodash"
import * as React from "react"
import {
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react"
import { prefixClassname } from "../styles"
import { getRect } from "../utils/dom/rect"
import { usePrevious } from "../utils/state"
import CalendarDay from "./calendar-day"
import CalendarContext from "./calendar.context"
import {
  CalendarDayObject,
  CalendarDayType,
  CalendarType,
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

  getValue(): Date

  getHeight(): number

  getScrollTop(subtitle: any): Promise<number>
}

function getBottom(type: CalendarType, dayType: CalendarDayType) {
  if (type === "range") {
    if (dayType === "start") {
      return "开始"
    }
    if (dayType === "end") {
      return "结束"
    }
    if (dayType === "active") {
      return "开始/结束"
    }
  }
}

interface CalendarMonthProps {
  value?: Date
  top?: boolean
  readonly?: boolean
  watermark?: boolean
  children?: ReactNode
}

const CalendarMonth = forwardRef<CalendarMonthInstance, CalendarMonthProps>(
  (props: CalendarMonthProps, ref) => {
    const { value: monthValue = new Date(), watermark, top } = props
    const { type, firstDayOfWeek, min, max, value: currentValue, subtitle, formatter } = useContext(
      CalendarContext,
    )

    const previousTop = usePrevious(top)
    const previousSubtitle = usePrevious(subtitle)

    const monthRef = useRef()
    const daysRef = useRef()

    const heightRef = useRef(0)

    const month = useMemo(() => monthValue.getMonth() + 1, [monthValue])

    const title = useMemo(() => `${monthValue.getFullYear()}年${monthValue.getMonth() + 1}月`, [
      monthValue,
    ])

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

        if (compareToStart === 0 && compareToEnd === 0) {
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
        const dayType = getDayType(dateValue)
        const oldDay: CalendarDayObject = {
          value: dateValue,
          type: dayType,
          bottom: getBottom(type, dayType),
          children: dayValue,
        }
        const newDay = formatter ? formatter(oldDay) : oldDay
        days.push(newDay)
      }
      return days
    }, [monthValue, totalDay, getDayType, type, formatter])

    const disabledDays = useMemo<CalendarDayObject[]>(
      () => days.filter((day) => day.type === "disabled"),
      [days],
    )

    const getScrollTop = useCallback((subtitle: any) => {
      return getRect(subtitle ? daysRef : monthRef).then(({ top }) => top)
    }, [])

    useImperativeHandle(
      ref,
      () => ({
        getScrollTop,
        disabledDays,
        getHeight: () => heightRef.current,
        getValue: () => monthValue,
      }),
      [disabledDays, getScrollTop, monthValue],
    )

    // Get height of month when top || subtitle
    useEffect(() => {
      if (!top || subtitle !== !previousTop || previousSubtitle) {
        nextTick(() =>
          getRect(monthRef) //
            .then(({ height }) => (heightRef.current = height)),
        )
      }
    }, [top, subtitle, previousTop, previousSubtitle])

    const content = useMemo(
      () =>
        _.map(days, (day, index) => (
          <CalendarDay
            key={index}
            className={day.className}
            style={{ marginLeft: index === 0 ? `${(100 * offset) / 7}%` : "" }}
            value={day.value}
            type={day.type}
            top={day.top}
            bottom={day.bottom}
            children={day.children}
          />
        )),
      [days, offset],
    )

    return (
      <View ref={monthRef} className={prefixClassname("calendar__month")}>
        {
          //
          (!top || !subtitle) && (
            <View className={prefixClassname("calendar__month-title")} children={title} />
          )
        }
        <View ref={daysRef} className={prefixClassname("calendar__days")}>
          {watermark && <CalendarMonthWatermark children={month} />}
          {content}
        </View>
      </View>
    )
  },
)

export default CalendarMonth
