import { ScrollView, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import { nextTick } from "@tarojs/taro"
import * as classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useEffect, useMemo, useRef, useState } from "react"
import useMounted from "../hooks/use-mounted"
import { prefixClassname } from "../styles"
import { getRect } from "../utils/dom/rect"
import { getScrollTop } from "../utils/dom/scroll"
import { useRefs } from "../utils/state"
import CalendarHeader from "./calendar-header"
import CalendarMonth, { CalendarMonthInstance } from "./calendar-month"
import CalendarContext from "./calendar.context"
import {
  CalendarDayObject,
  CalendarType,
  CalendarValueType,
  compareDate,
  compareYearMonth,
  createNextDay,
  createPreviousDay,
  createToday,
  MAX_DATE,
  MIN_DATE,
} from "./calendar.shared"

interface CalendarProps extends ViewProps {
  type?: CalendarType
  title?: ReactNode
  subtitle?: ReactNode
  defaultValue?: CalendarValueType
  value?: CalendarValueType
  min?: Date
  max?: Date
  firstDayOfWeek?: number
  watermark?: boolean
  readonly?: boolean
  lazyRender?: boolean
  maxRange?: number
  rangePrompt?: boolean
  children?: ReactNode

  onChange?(value: any): void
}

function Calendar(props: CalendarProps) {
  const {
    className,
    style,
    title = true,
    type = "single",
    defaultValue,
    value: currentValue,
    min: minValue = MIN_DATE,
    max: maxValue = MAX_DATE,
    firstDayOfWeek,
    readonly = false,
    watermark = true,
    lazyRender = false,
    onChange,
  } = props

  // const currentValueRef = useToRef(currentValue)

  const changeValueRef = useRef<CalendarValueType>()

  const bodyRef = useRef()
  const [subtitle, setSubtitle] = useState("222")
  const [bodyScrollTop, setBodyScrollTop] = useState(0)
  const bodyScrollTopRef = useRef(0)
  const [monthRefs, setMonthRefs] = useRefs<CalendarMonthInstance>()
  const dayOffset = useMemo(() => (firstDayOfWeek ? +firstDayOfWeek % 7 : 0), [firstDayOfWeek])

  const limitDateRange = (date: Date, minDate = minValue, maxDate = maxValue) => {
    if (compareDate(date, minDate) === -1) {
      return minDate
    }
    if (compareDate(date, maxDate) === 1) {
      return maxDate
    }
    return date
  }

  const getInitialDate = (defaultDate = defaultValue) => {
    if (defaultDate === null) {
      return defaultDate
    }

    const now = createToday()

    if (type === "range") {
      if (!Array.isArray(defaultDate)) {
        defaultDate = []
      }
      const start = limitDateRange(defaultDate[0] || now, minValue, createPreviousDay(maxValue))
      const end = limitDateRange(defaultDate[1] || now, createNextDay(minValue))
      return [start, end]
    }

    if (type === "multiple") {
      if (Array.isArray(defaultDate)) {
        return defaultDate.map((date) => limitDateRange(date))
      }
      return [limitDateRange(now)]
    }

    if (!defaultDate || Array.isArray(defaultDate)) {
      defaultDate = now
    }
    return limitDateRange(defaultDate)
  }

  const months = useMemo<Date[]>(() => {
    const months: Date[] = []
    const cursor = new Date(minValue)

    cursor.setDate(1)

    do {
      months.push(new Date(cursor))
      cursor.setMonth(cursor.getMonth() + 1)
    } while (compareYearMonth(cursor, maxValue) !== 1)

    return months
  }, [maxValue, minValue])

  // get first disabled calendarDay between date range
  const getDisabledDate = (
    disabledDays: CalendarDayObject[],
    startDay: Date,
    date: Date,
  ): Date | undefined =>
    disabledDays.find(
      (day) => compareDate(startDay, day.value!) === -1 && compareDate(day.value!, date) === -1,
    )?.value

  // disabled calendarDay
  const getDisabledDays = () =>
    monthRefs.reduce((arr, ref) => {
      arr.push(...(ref.current.disabledDays ?? []))
      return arr
    }, [] as CalendarDayObject[])

  const change = (dateValue: Date | Date[], complete?: boolean) => {
    // if (complete && type === "range") {
    //   const valid = checkRange(date as [Date, Date])
    //
    //   if (!valid) {
    //     // auto selected to max range if showConfirm
    //     if (props.showConfirm) {
    //       setCurrentDate([
    //         (date as Date[])[0],
    //         getDayByOffset((date as Date[])[0], +props.maxRange - 1),
    //       ])
    //     } else {
    //       setCurrentDate(date)
    //     }
    //     return
    //   }
    // }
    changeValueRef.current = dateValue
    onChange?.(dateValue)
  }

  const onDayClick = (day: CalendarDayObject) => {
    const { value: date } = day
    if (readonly || !date) {
      return
    }

    if (type === "range") {
      const disabledDays = getDisabledDays()

      if (!currentValue) {
        change([date])
        return
      }

      const [startDay, endDay] = currentValue as [Date, Date]

      if (startDay && !endDay) {
        const compareToStart = compareDate(date, startDay)

        if (compareToStart === 1) {
          const disabledDay = getDisabledDate(disabledDays, startDay, date)

          if (disabledDay) {
            change([startDay, createPreviousDay(disabledDay)])
          } else {
            change([startDay, date], true)
          }
        } else if (compareToStart === -1) {
          change([date])
        } else {
          change([date, date], true)
        }
      } else {
        change([date])
      }
    } else if (type === "multiple") {
      if (!currentValue) {
        change([date])
        return
      }
      const dates = currentValue as Date[]

      const newDates = _.filter(dates, (dateItem) => compareDate(dateItem, date) !== 0)
      if (_.size(newDates) !== _.size(dates)) {
        change(newDates)
        // emit("unselect", cloneDate(unselectedDate))
      } /*else if (maxRange && dates.length >= maxRange) {
          // Toast(props.rangePrompt || t("rangePrompt", props.maxRange))
        } */ else {
        change([...dates, date])
      }
    } else {
      change(date)
    }
  }

  const onScroll = async () => {
    const top = await getScrollTop(bodyRef)
    const bodyHeight = (await getRect(bodyRef)).height
    const bottom = top + bodyHeight
    const heights = months.map((item, index) => monthRefs[index].current.getHeight!())
    const heightSum = heights.reduce((a, b) => a + b, 0)

    // iOS scroll bounce may exceed the range
    if (bottom > heightSum && top > 0) {
      return
    }

    let height = 0
    let currentMonth
    const visibleRange = [-1, -1]

    for (let i = 0; i < months.length; i++) {
      const month = monthRefs[i]
      const visible = height <= bottom && height + heights[i] >= top

      if (visible) {
        visibleRange[1] = i

        if (!currentMonth) {
          currentMonth = month
          visibleRange[0] = i
        }
      }

      height += heights[i]
    }

    months.forEach((month, index) => {
      const visible = index >= visibleRange[0] - 1 && index <= visibleRange[1] + 1
      monthRefs[index].current?.setVisible(visible)
    })

    /* istanbul ignore else */
    if (currentMonth) {
      setSubtitle(currentMonth.current.getTitle())
    }
  }

  const scrollToDate = async (targetDate: Date) => {
    months.some((month, index) => {
      if (compareYearMonth(month, targetDate) === 0) {
        if (bodyRef.current) {
          Promise.all([
            getRect(bodyRef), //
            getScrollTop(bodyRef),
            monthRefs[index].current?.getScrollTop(),
          ]).then(([{ top: bodyTop }, bodyScrollTop, monthScrollTop]) => {
            const newBodyScrollTop = monthScrollTop - bodyTop + bodyScrollTop
            if (bodyScrollTopRef.current !== newBodyScrollTop) {
              setBodyScrollTop(bodyScrollTopRef.current)
              setBodyScrollTop(newBodyScrollTop)
            } else {
              setBodyScrollTop(newBodyScrollTop)
            }
          })
        }
        return true
      }

      return false
    })

    await onScroll()
  }

  // scroll to current month
  const scrollIntoView = async (newValue?: Date | Date[]) => {
    if (newValue) {
      const targetDate = type === "single" ? (newValue as Date) : (newValue as Date[])[0]
      await scrollToDate(targetDate)
    } else {
      await onScroll()
    }
  }

  const reset = (date = getInitialDate()) => nextTick(() => scrollIntoView(date).then())

  const init = () => reset(currentValue ?? defaultValue)

  useEffect(() => {
    if (currentValue !== changeValueRef.current) {
      nextTick(() => reset(currentValue))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue])

  useEffect(() => {
    nextTick(() => reset(getInitialDate(currentValue)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, minValue, maxValue])

  useMounted(init)

  const monthsRender = useMemo(() => {
    return _.map(months, (month, index) => (
      <CalendarMonth
        ref={setMonthRefs(index)}
        key={month.getTime()}
        value={month}
        subtitle={index !== 0}
        watermark={watermark}
        lazyRender={lazyRender}
      />
    ))
  }, [lazyRender, months, setMonthRefs, watermark])
  return (
    <CalendarContext.Provider
      value={{
        type,
        firstDayOfWeek: dayOffset,
        min: minValue,
        max: maxValue,
        value: currentValue,
        onDayClick,
      }}
    >
      <View
        className={classNames(
          prefixClassname("calendar"),
          prefixClassname(`calendar--${type}`),
          className,
        )}
        style={style}
      >
        <CalendarHeader title={title} subtitle={subtitle} />
        <ScrollView
          ref={bodyRef}
          className={prefixClassname("calendar__body")}
          scrollY
          scrollTop={bodyScrollTop}
          onScroll={async ({ detail }) => {
            bodyScrollTopRef.current = detail.scrollTop
            await onScroll()
          }}
        >
          {monthsRender}
        </ScrollView>
      </View>
    </CalendarContext.Provider>
  )
}

export default Calendar
