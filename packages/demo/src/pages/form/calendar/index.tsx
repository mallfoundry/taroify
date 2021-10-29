import { Calendar, Cell, Popup } from "@taroify/core"
import { CalendarType } from "@taroify/core/calendar"
import { ArrowRight } from "@taroify/icons"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useCallback, useMemo, useState } from "react"
import Block from "../../../components/block"
import BlockCard from "../../../components/block-card"
import Page from "../../../components/page"
import "./index.scss"

const minDate = new Date(2012, 1, 10)
const maxDate = new Date(2012, 10, 20)

function TiledCalendar() {
  const [value, setValue] = useState<Date>(minDate)
  return (
    <Calendar
      style={{ height: "500px" }}
      title="日历"
      min={minDate}
      max={maxDate}
      value={value}
      onChange={setValue}
    />
  )
}

const formatDate = (date: Date) => {
  if (date) {
    return `${date.getMonth() + 1}/${date.getDate()}`
  }
}

const formatFullDate = (date: Date) => {
  if (date) {
    return `${date.getFullYear()}/${formatDate(date)}`
  }
}

const formatMultiple = (dates: Date[]) => {
  if (dates.length) {
    return `选择了 ${dates.length} 个日期`
  }
}

const formatRange = (dateRange: Date[]) => {
  if (dateRange.length) {
    const [start, end] = dateRange
    return `${formatDate(start)} - ${formatDate(end)}`
  }
}

const dayFormatter = (day: Calendar.DayObject) => {
  if (!day.value) {
    return day
  }

  const month = day.value.getMonth() + 1
  const date = day.value.getDate()

  if (month === 5) {
    if (date === 1) {
      day.top = "劳动节"
    } else if (date === 4) {
      day.top = "青年节"
    } else if (date === 11) {
      day.children = "今天"
    }
  }

  if (day.type === "start") {
    day.bottom = "入店"
  } else if (day.type === "end") {
    day.bottom = "离店"
  } else if (day.type === "active") {
    day.bottom = "入店/离店"
  }

  return day
}

interface CalendarValues {
  single?: any
  range?: any
  multiple?: any
  singleQuickly?: any
  rangeQuickly?: any
  customColor: any
  customConfirm: any
  customRange: any
  customDay: any
  customPosition: any
  customFirstDayOfWeek: any
}

type CalendarValueType =
  | "single"
  | "range"
  | "multiple"
  | "singleQuickly"
  | "rangeQuickly"
  | "customColor"
  | "customConfirm"
  | "customRange"
  | "customDay"
  | "customPosition"
  | "customFirstDayOfWeek"

interface CalendarOptions {
  open?: boolean
  quickly?: boolean
  type?: CalendarType
  style?: CSSProperties
  minDate?: Date
  maxDate?: Date
  confirm?: ReactNode
  formatter?: any
  firstDayOfWeek?: number
  placement: "bottom" | "right"
  values: CalendarValues
  confirmValues: CalendarValues
}

export default function CalendarDemo() {
  const [valueType, setValueType] = useState<CalendarValueType>()
  const [options, setOptions] = useState<CalendarOptions>({
    placement: "bottom",
    values: {
      single: undefined,
      range: [],
      multiple: [],
      singleQuickly: undefined,
      rangeQuickly: [],

      customColor: [],
      customConfirm: [],
      customRange: [],
      customDay: [],
      customPosition: undefined,
      customFirstDayOfWeek: undefined,
    },
    confirmValues: {
      single: undefined,
      range: [],
      multiple: [],
      singleQuickly: undefined,
      rangeQuickly: [],

      customColor: [],
      customConfirm: [],
      customRange: [],
      customDay: [],
      customPosition: undefined,
      customFirstDayOfWeek: undefined,
    },
  })

  const getNewOptions = useCallback(() => {
    return {
      ...options,
      quickly: false,
      confirm: undefined,
      placement: "bottom",
      style: undefined,
      minDate: undefined,
      maxDate: undefined,
      formatter: undefined,
      firstDayOfWeek: 0,
    } as CalendarOptions
  }, [options])

  const updateOptions = useCallback(
    (valueType: CalendarValueType) => {
      const newOptions = getNewOptions()
      if (valueType === "single") {
        newOptions.open = true
        newOptions.type = "single"
      } else if (valueType === "multiple") {
        newOptions.open = true
        newOptions.type = "multiple"
      } else if (valueType === "range") {
        newOptions.open = true
        newOptions.type = "range"
      } else if (valueType === "singleQuickly") {
        newOptions.open = true
        newOptions.quickly = true
        newOptions.type = "single"
      } else if (valueType === "rangeQuickly") {
        newOptions.open = true
        newOptions.quickly = true
        newOptions.type = "range"
      } else if (valueType === "customColor") {
        newOptions.open = true
        newOptions.type = "range"
        newOptions.style = {
          // @ts-ignore
          "--calendar-active-color": "#1989fa",
        }
      } else if (valueType === "customRange") {
        newOptions.open = true
        newOptions.type = "range"
        newOptions.minDate = new Date(2010, 0, 1)
        newOptions.maxDate = new Date(2010, 0, 31)
      } else if (valueType === "customConfirm") {
        newOptions.open = true
        newOptions.type = "range"
        newOptions.confirm = "请选择结束时间"
      } else if (valueType === "customDay") {
        newOptions.open = true
        newOptions.type = "range"
        newOptions.minDate = new Date(2010, 4, 1)
        newOptions.maxDate = new Date(2010, 4, 31)
        newOptions.formatter = dayFormatter
      } else if (valueType === "customPosition") {
        newOptions.open = true
        newOptions.type = "single"
        newOptions.placement = "right"
      } else if (valueType === "customFirstDayOfWeek") {
        newOptions.open = true
        newOptions.type = "single"
        newOptions.firstDayOfWeek = 1
      }
      setOptions(newOptions)
      setValueType(valueType)
    },
    [getNewOptions],
  )

  const value = useMemo(() => {
    if (valueType === "single") {
      return options.values.single
    } else if (valueType === "singleQuickly") {
      return options.values.singleQuickly
    } else if (valueType === "multiple") {
      return options.values.multiple
    } else if (valueType === "range") {
      return options.values.range
    } else if (valueType === "rangeQuickly") {
      return options.values.rangeQuickly
    } else if (valueType === "customColor") {
      return options.values.customColor
    } else if (valueType === "customRange") {
      return options.values.customRange
    } else if (valueType === "customConfirm") {
      return options.values.customConfirm
    } else if (valueType === "customDay") {
      return options.values.customDay
    } else if (valueType === "customPosition") {
      return options.values.customPosition
    } else if (valueType === "customFirstDayOfWeek") {
      return options.values.customFirstDayOfWeek
    }
  }, [
    options.values.customColor,
    options.values.customConfirm,
    options.values.customDay,
    options.values.customFirstDayOfWeek,
    options.values.customPosition,
    options.values.customRange,
    options.values.multiple,
    options.values.range,
    options.values.rangeQuickly,
    options.values.single,
    options.values.singleQuickly,
    valueType,
  ])

  const onChange = useCallback(
    (aValue) => {
      if (valueType === "single") {
        setOptions({
          ...options,
          values: {
            ...options.values,
            single: aValue,
          },
        })
      } else if (valueType === "singleQuickly") {
        setOptions({
          ...options,
          open: false,
          values: {
            ...options.values,
            singleQuickly: aValue,
          },
          confirmValues: {
            ...options.confirmValues,
            singleQuickly: aValue,
          },
        })
      } else if (valueType === "multiple") {
        setOptions({
          ...options,
          values: {
            ...options.values,
            multiple: aValue,
          },
        })
      } else if (valueType === "range") {
        setOptions({
          ...options,
          values: {
            ...options.values,
            range: aValue,
          },
        })
      } else if (valueType === "rangeQuickly") {
        if (_.size(aValue) === 2) {
          options.confirmValues.rangeQuickly = aValue
          options.open = false
        }
        setOptions({
          ...options,
          values: {
            ...options.values,
            rangeQuickly: aValue,
          },
        })
      } else if (valueType === "customColor") {
        setOptions({
          ...options,
          values: {
            ...options.values,
            customColor: aValue,
          },
        })
      } else if (valueType === "customRange") {
        setOptions({
          ...options,
          values: {
            ...options.values,
            customRange: aValue,
          },
        })
      } else if (valueType === "customConfirm") {
        setOptions({
          ...options,
          confirm: _.size(aValue) === 2 ? "完成" : "请选择结束时间",
          values: {
            ...options.values,
            customConfirm: aValue,
          },
        })
      } else if (valueType === "customDay") {
        setOptions({
          ...options,
          values: {
            ...options.values,
            customDay: aValue,
          },
        })
      } else if (valueType === "customPosition") {
        setOptions({
          ...options,
          values: {
            ...options.values,
            customPosition: aValue,
          },
        })
      } else if (valueType === "customFirstDayOfWeek") {
        setOptions({
          ...options,
          values: {
            ...options.values,
            customFirstDayOfWeek: aValue,
          },
        })
      }
    },
    [options, valueType],
  )

  const onConfirm = useCallback(() => {
    if (valueType === "single") {
      setOptions({
        ...options,
        open: false,
        confirmValues: {
          ...options.confirmValues,
          single: options.values.single,
        },
      })
    } else if (valueType === "multiple") {
      setOptions({
        ...options,
        open: false,
        confirmValues: {
          ...options.confirmValues,
          multiple: options.values.multiple,
        },
      })
    } else if (valueType === "range" && _.size(options.values.range) === 2) {
      setOptions({
        ...options,
        open: false,
        confirmValues: {
          ...options.confirmValues,
          range: options.values.range,
        },
      })
    } else if (valueType === "customColor" && _.size(options.values.customColor) === 2) {
      setOptions({
        ...options,
        open: false,
        confirmValues: {
          ...options.confirmValues,
          customColor: options.values.customColor,
        },
      })
    } else if (valueType === "customRange" && _.size(options.values.customRange) === 2) {
      setOptions({
        ...options,
        open: false,
        confirmValues: {
          ...options.confirmValues,
          customRange: options.values.customRange,
        },
      })
    } else if (valueType === "customConfirm" && _.size(options.values.customConfirm) === 2) {
      setOptions({
        ...options,
        open: false,
        confirmValues: {
          ...options.confirmValues,
          customConfirm: options.values.customConfirm,
        },
      })
    } else if (valueType === "customDay" && _.size(options.values.customDay) === 2) {
      setOptions({
        ...options,
        open: false,
        confirmValues: {
          ...options.confirmValues,
          customDay: options.values.customDay,
        },
      })
    } else if (valueType === "customPosition") {
      setOptions({
        ...options,
        open: false,
        confirmValues: {
          ...options.confirmValues,
          customPosition: options.values.customPosition,
        },
      })
    } else if (valueType === "customFirstDayOfWeek") {
      setOptions({
        ...options,
        open: false,
        confirmValues: {
          ...options.confirmValues,
          customFirstDayOfWeek: options.values.customFirstDayOfWeek,
        },
      })
    }
  }, [options, valueType])

  return (
    <Page title="Calendar 日历" className="calendar-demo">
      <Block title="基础用法">
        <Cell.Group clickable inset>
          <Cell
            title="选择单个日期"
            rightIcon={<ArrowRight />}
            children={formatFullDate(options.confirmValues.single)}
            onClick={() => updateOptions("single")}
          />
          <Cell
            title="选择多个日期"
            rightIcon={<ArrowRight />}
            children={formatMultiple(options.confirmValues.multiple)}
            onClick={() => updateOptions("multiple")}
          />
          <Cell
            title="选择日期区间"
            rightIcon={<ArrowRight />}
            children={formatRange(options.confirmValues.range)}
            onClick={() => updateOptions("range")}
          />
        </Cell.Group>
      </Block>
      <Block title="快捷选择">
        <Cell.Group clickable inset>
          <Cell
            title="选择单个日期"
            rightIcon={<ArrowRight />}
            children={formatFullDate(options.confirmValues.singleQuickly)}
            onClick={() => updateOptions("singleQuickly")}
          />
          <Cell
            title="选择日期区间"
            rightIcon={<ArrowRight />}
            children={formatRange(options.confirmValues.rangeQuickly)}
            onClick={() => updateOptions("rangeQuickly")}
          />
        </Cell.Group>
      </Block>
      <Block title="自定义日历">
        <Cell.Group clickable inset>
          <Cell
            title="自定义颜色"
            rightIcon={<ArrowRight />}
            children={formatRange(options.confirmValues.customColor)}
            onClick={() => updateOptions("customColor")}
          />
          <Cell
            title="自定义日期范围"
            rightIcon={<ArrowRight />}
            children={formatRange(options.confirmValues.customRange)}
            onClick={() => updateOptions("customRange")}
          />
          <Cell
            title="自定义按钮"
            rightIcon={<ArrowRight />}
            children={formatRange(options.confirmValues.customConfirm)}
            onClick={() => updateOptions("customConfirm")}
          />
          <Cell
            title="自定义日期文案"
            rightIcon={<ArrowRight />}
            children={formatRange(options.confirmValues.customDay)}
            onClick={() => updateOptions("customDay")}
          />
          <Cell
            title="自定义弹出位置"
            rightIcon={<ArrowRight />}
            children={formatFullDate(options.confirmValues.customPosition)}
            onClick={() => updateOptions("customPosition")}
          />
          <Cell
            title="自定义周起始日"
            rightIcon={<ArrowRight />}
            children={formatFullDate(options.confirmValues.customFirstDayOfWeek)}
            onClick={() => updateOptions("customFirstDayOfWeek")}
          />
        </Cell.Group>
      </Block>
      <Block title="平铺展示">
        <BlockCard>
          <TiledCalendar />
        </BlockCard>
      </Block>
      <Popup
        style={{ height: options.placement === "bottom" ? "80%" : "100%" }}
        open={options.open}
        rounded={options.placement === "bottom"}
        placement={options.placement}
        onClose={() => setOptions({ ...options, open: false })}
      >
        <Popup.Close />
        <Calendar
          style={options.style}
          type={options.type}
          min={options.minDate}
          max={options.maxDate}
          formatter={options.formatter}
          firstDayOfWeek={options.firstDayOfWeek}
          value={value}
          onChange={onChange}
          onConfirm={onConfirm}
        >
          {!options.quickly && (
            <Calendar.Footer>
              <Calendar.Button children={options.confirm} />
            </Calendar.Footer>
          )}
        </Calendar>
      </Popup>
    </Page>
  )
}
