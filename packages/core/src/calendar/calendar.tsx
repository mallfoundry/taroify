import { useUncontrolled } from "@taroify/hooks"
import { ScrollView, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import { nextTick, getEnv } from "@tarojs/taro"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import Popup from "../popup"
import type { PopupPlacement } from "../popup"
import type { PopupProps } from "../popup/popup"
import { prefixClassname } from "../styles"
import { getRect } from "../utils/dom/rect"
import { getScrollTop } from "../utils/dom/scroll"
import { useRefs } from "../utils/state"
import raf from "../utils/raf"
import { useMemoizedFn } from "../hooks"
import CalendarFooter from "./calendar-footer"
import CalendarButton from "./calendar-button"
import CalendarHeader from "./calendar-header"
import CalendarMonth, { CalendarMonthInstance } from "./calendar-month"
import CalendarContext from "./calendar.context"
import {
  CalendarDayObject,
  CalendarType,
  CalendarValueType,
  CalendarSubtitle,
  compareDate,
  compareYearMonth,
  createNextDay,
  createPreviousDay,
  createToday,
  MAX_DATE,
  MIN_DATE,
  genMonthId,
} from "./calendar.shared"


function defaultSubtitleRender(date: Date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`
}

function defaultFormatter(day: CalendarDayObject) {
  return day
}

export interface CalendarProps extends ViewProps {
  type?: CalendarType
  title?: ReactNode
  subtitle?: CalendarSubtitle
  showSubtitle?: boolean
  defaultValue?: CalendarValueType
  value?: CalendarValueType
  min?: Date
  max?: Date
  poppable?: boolean
  showPopup?: boolean
  popupPlacement?: PopupPlacement
  popupRounded?: boolean
  popupCloseIcon?: boolean
  showConfirm?: boolean
  confirmText?: ReactNode
  confirmDisabledText?: ReactNode
  firstDayOfWeek?: number
  watermark?: boolean
  readonly?: boolean
  children?: ReactNode

  formatter?(day: CalendarDayObject): CalendarDayObject

  onChange?(value: any): void

  onConfirm?(value: any): void

  onClose?(val: boolean): void
}

function Calendar(props: CalendarProps) {
  const {
    className,
    style,
    title = "日期选择",
    subtitle = defaultSubtitleRender,
    showSubtitle = true,
    type = "single",
    // set false to be compatible with lower versions
    poppable = false,
    showPopup = false,
    popupPlacement = "bottom",
    popupRounded = true,
    popupCloseIcon = true,
    showConfirm = true,
    confirmText = "确认",
    confirmDisabledText = "确认",
    defaultValue: defaultValueProp,
    value: valueProp,
    min: minValue = MIN_DATE,
    max: maxValue = MAX_DATE,
    firstDayOfWeek,
    readonly = false,
    watermark = true,
    formatter = defaultFormatter,
    children: childrenProp,
    onChange: onChangeProp,
    onConfirm,
    onClose,
  } = props

  const Wrapper = useMemo<React.FC<PopupProps>>(() => poppable ? Popup : ({children}) => <>{children}</>, [poppable])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultValue = useMemo(() => getInitialDate(defaultValueProp), [])
  const { value, setValue } = useUncontrolled({
    defaultValue,
    value: valueProp,
    onChange: onChangeProp,
  })

  const renderFooter = () => {
    let _footer: ReactNode = null
    Children.forEach(childrenProp, (child: ReactNode) => {
      if (isValidElement(child)) {
        const element = child as ReactElement
        const { type: elementType } = element
        if (elementType === CalendarFooter) {
          _footer = element
        }
      }
    })
    if (!_footer && showConfirm) {
      _footer = <CalendarFooter>
        <CalendarButton type="confirm" confirmText={confirmText} confirmDisabledText={confirmDisabledText}  />
      </CalendarFooter>
    }
    return _footer
  }

  const scrollViewRef = useRef<HTMLDivElement>()
  const scrollViewHeightRef = useRef(0)

  const hasConfirmRef = useRef(false)

  const [currentMonth, setCurrentMonth] = useState<Date>();

  const changeValueRef = useRef<CalendarValueType>()

  const [scrollIntoView, setScrollIntoView] = useState("")

  const {
    getRef: getMonthRef,
    getRefs: getMonthRefs,
    setRefs: setMonthRefs,
    clearRefs: clearMonthRefs,
  } = useRefs<CalendarMonthInstance>()

  const dayOffset = useMemo(() => (firstDayOfWeek ? +firstDayOfWeek % 7 : 0), [firstDayOfWeek])

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

  function limitDateRange(date: Date, minDate = minValue, maxDate = maxValue) {
    if (compareDate(date, minDate) === -1) {
      return minDate
    }
    if (compareDate(date, maxDate) === 1) {
      return maxDate
    }
    return date
  }

  function getInitialDate(defaultDate?: CalendarValueType) {
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

  // get first disabled calendarDay between date range
  function getDisabledDate(
    disabledDays: CalendarDayObject[],
    startDay: Date,
    date: Date,
  ): Date | undefined {
    return disabledDays.find(
      (day) => compareDate(startDay, day.value!) === -1 && compareDate(day.value!, date) === -1,
    )?.value
  }

  // disabled calendarDay
  function getDisabledDays() {
    return getMonthRefs().reduce((arr, ref) => {
      arr.push(...(ref.current?.disabledDays ?? []))
      return arr
    }, [] as CalendarDayObject[])
  }

  function change(dateValue: CalendarValueType, complete?: boolean) {
    changeValueRef.current = dateValue
    setValue?.(dateValue)

    if (complete && !hasConfirmRef.current) {
      onConfirm?.(dateValue)
    }
  }

  function onDayClick(day: CalendarDayObject) {
    const { value: date } = day
    if (readonly || !date) {
      return
    }

    if (type === "range") {
      const disabledDays = getDisabledDays()

      if (!value) {
        change([date])
        return
      }

      const [startDay, endDay] = value as [Date, Date]

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
      if (!value) {
        change([date])
        return
      }
      const dates = value as Date[]

      const newDates = _.filter(dates, (dateItem) => compareDate(dateItem, date) !== 0)
      if (_.size(newDates) !== _.size(dates)) {
        change(newDates)
      } else {
        change([...dates, date])
      }
    } else {
      change(date, true)
    }
  }

  async function onScroll() {
    const top = await getScrollTop(scrollViewRef)
    const bottom = top + scrollViewHeightRef.current
    const heights = months.map((item, index) => getMonthRef(index).current.getHeight())
    const heightSum = heights.reduce((a, b) => a + b, 0)

    // iOS scroll bounce may exceed the range
    if (bottom > heightSum && top > 0) {
      return
    }

    let height = 0
    let currentMonthRef

    for (let i = 0; i < months.length; i++) {
      const month = getMonthRef(i)
      const visible = height <= bottom && height + heights[i] >= top

      if (visible && !currentMonthRef) {
        currentMonthRef = month
        break
      }

      height += heights[i]
    }

    if (currentMonthRef) {
      setCurrentMonth(currentMonthRef.current.getValue())
    }
  }

  async function scrollToDate(targetDate?: Date) {
    months.some((month, index) => {
      if (compareYearMonth(month, targetDate as Date) === 0) {
        const currentMonthRef = getMonthRef(index)
        const month = currentMonthRef.current.getValue()
        setCurrentMonth(month)
        if (getEnv() === "WEB") {
          nextTick(() => {
            if (scrollViewRef.current) {
              Promise.all([
                getRect(scrollViewRef),
                getScrollTop(scrollViewRef),
                currentMonthRef.current?.getRectTop(),
              ]).then(([{ top: scrollViewRectTop }, currentScrollTop, currentMonthRectTop]) => {
                const newBodyScrollTop = currentMonthRectTop - scrollViewRectTop + currentScrollTop
                scrollViewRef.current!.scrollTop = newBodyScrollTop
              })
            }
          })
        } else {
          setScrollIntoView(genMonthId(month))
        }


        return true
      }
      return false
    })
  }

  // scroll to current month
  async function scrollToCurrentDate(newValue?: CalendarValueType) {
    if (poppable && !showPopup) {
      return
    }
    if (newValue) {
      const targetDate = type === "single" ? (newValue as Date) : (newValue as Date[])[0];
      if (_.isDate(targetDate)) {
        scrollToDate(targetDate);
      }
    } else {
      onScroll()
    }
  }

  const reset = (date?: CalendarValueType) => nextTick(() => scrollToCurrentDate(date).then())

  const init = useMemoizedFn(() => {
    if (poppable && !showPopup) {
      setScrollIntoView("")
      return;
    }

    raf(async () => {
      // add Math.floor to avoid decimal height issues
      // https://github.com/vant-ui/vant/issues/5640
      const bodyHeight = (await getRect(scrollViewRef)).height
      scrollViewHeightRef.current = Math.floor(bodyHeight);
      reset(getInitialDate(value))
    });
  })

  useEffect(() => {
    if (value !== changeValueRef.current) {
      reset(getInitialDate(value))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    reset(getInitialDate(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, minValue, maxValue])

  useEffect(() => {
    init()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopup])

  const monthsRender = useMemo(() => {
    // When rerender, clear columns refs
    // Prevent leakage and contamination
    clearMonthRefs?.()
    //
    return _.map(months, (month, index) => (
      <CalendarMonth
        ref={setMonthRefs(index)}
        key={month.getTime()}
        value={month}
        showMonthTitle={index !== 0 || !showSubtitle}
        watermark={watermark}
      />
    ))
  }, [clearMonthRefs, months, setMonthRefs, watermark, showSubtitle])

  function notifyConfirm(hasConfirm: boolean) {
    hasConfirmRef.current = hasConfirm
  }

  function handleConfirm() {
    onConfirm?.(value as CalendarValueType)
  }

  return (
    <CalendarContext.Provider
      value={{
        type,
        firstDayOfWeek: dayOffset,
        min: minValue,
        max: maxValue,
        value,
        formatter,
        onDayClick,
        notifyConfirm,
        onConfirm: handleConfirm,
      }}
    >
      <Wrapper rounded={popupRounded} placement={popupPlacement} open={showPopup} onClose={onClose} className={classNames(prefixClassname("calendar--popup"))}>
        {(poppable && showPopup && popupCloseIcon) && <Popup.Close /> }
        <View
          className={classNames(
            prefixClassname("calendar"),
            prefixClassname(`calendar--${type}`),
            className,
          )}
          style={style}
        >
          <CalendarHeader title={title} subtitle={subtitle} date={currentMonth} showSubtitle={showSubtitle}  />
          <ScrollView
            ref={scrollViewRef}
            className={prefixClassname("calendar__body")}
            scrollY
            scrollIntoView={scrollIntoView}
            onScroll={onScroll}
          >
            {monthsRender}
          </ScrollView>
          {renderFooter()}
        </View>
      </Wrapper>
    </CalendarContext.Provider>
  )
}

export default Calendar
