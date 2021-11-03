import { DatetimePicker } from "@taroify/core"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function DatePicker() {
  const [minDate] = useState(new Date(2020, 0, 1))
  const [maxDate] = useState(new Date(2025, 10, 1))
  const [value, setValue] = useState(new Date(2021, 0, 17))
  return (
    <DatetimePicker type="date" value={value} min={minDate} max={maxDate} onChange={setValue}>
      <DatetimePicker.Toolbar>
        <DatetimePicker.Button>取消</DatetimePicker.Button>
        <DatetimePicker.Title>选择年月日</DatetimePicker.Title>
        <DatetimePicker.Button>确认</DatetimePicker.Button>
      </DatetimePicker.Toolbar>
    </DatetimePicker>
  )
}

function YearMonthPicker() {
  const [minDate] = useState(new Date(2020, 0, 1))
  const [maxDate] = useState(new Date(2025, 10, 1))
  const [value, setValue] = useState(new Date(2021, 0, 17))

  return (
    <DatetimePicker
      type="year-month"
      value={value}
      min={minDate}
      max={maxDate}
      formatter={(type, val) => {
        if (type === "year") {
          return `${val}年`
        }
        if (type === "month") {
          return `${val}月`
        }
        return val
      }}
      onChange={setValue}
    >
      <DatetimePicker.Toolbar>
        <DatetimePicker.Button>取消</DatetimePicker.Button>
        <DatetimePicker.Title>选择年月</DatetimePicker.Title>
        <DatetimePicker.Button>确认</DatetimePicker.Button>
      </DatetimePicker.Toolbar>
    </DatetimePicker>
  )
}

function MonthDayPicker() {
  const [minDate] = useState(new Date(2020, 0, 1))
  const [maxDate] = useState(new Date(2025, 10, 1))
  const [value, setValue] = useState(new Date(2021, 0, 17))

  return (
    <DatetimePicker
      type="month-day"
      min={minDate}
      max={maxDate}
      value={value}
      formatter={(type, val) => {
        if (type === "month") {
          return `${val}月`
        }
        if (type === "day") {
          return `${val}日`
        }
        return val
      }}
      onChange={setValue}
    >
      <DatetimePicker.Toolbar>
        <DatetimePicker.Button>取消</DatetimePicker.Button>
        <DatetimePicker.Title>选择年月</DatetimePicker.Title>
        <DatetimePicker.Button>确认</DatetimePicker.Button>
      </DatetimePicker.Toolbar>
    </DatetimePicker>
  )
}

function TimePicker() {
  const [minDate] = useState(new Date(2020, 0, 1, 10, 0, 0))
  const [maxDate] = useState(new Date(2020, 0, 1, 20, 59, 59))
  const [value, setValue] = useState(new Date(2020, 0, 1, 12, 0, 0))

  return (
    <DatetimePicker type="time" value={value} min={minDate} max={maxDate} onChange={setValue}>
      <DatetimePicker.Toolbar>
        <DatetimePicker.Button>取消</DatetimePicker.Button>
        <DatetimePicker.Title>选择时间</DatetimePicker.Title>
        <DatetimePicker.Button>确认</DatetimePicker.Button>
      </DatetimePicker.Toolbar>
    </DatetimePicker>
  )
}

function DateTimePicker() {
  const [minDate] = useState(new Date(2020, 0, 1, 10, 0, 0))
  const [maxDate] = useState(new Date(2025, 10, 1, 20, 59, 59))
  const [value, setValue] = useState(new Date(2021, 2, 3, 12, 12, 12))

  return (
    <DatetimePicker type="datetime" value={value} min={minDate} max={maxDate} onChange={setValue}>
      <DatetimePicker.Toolbar>
        <DatetimePicker.Button>取消</DatetimePicker.Button>
        <DatetimePicker.Title>选择完整时间</DatetimePicker.Title>
        <DatetimePicker.Button>确认</DatetimePicker.Button>
      </DatetimePicker.Toolbar>
    </DatetimePicker>
  )
}

function TimePickerWithFilter() {
  const [minDate] = useState(new Date(2020, 0, 1, 0, 0, 0))
  const [maxDate] = useState(new Date(2020, 0, 1, 23, 59, 59))
  const [value, setValue] = useState(new Date(2020, 0, 1, 12, 0, 0))

  return (
    <DatetimePicker
      type="time"
      value={value}
      min={minDate}
      max={maxDate}
      onChange={setValue}
      filter={(type, options) => {
        if (type === "minute") {
          return options.filter((option) => Number(option) % 5 === 0)
        }
        return options
      }}
    >
      <DatetimePicker.Toolbar>
        <DatetimePicker.Button>取消</DatetimePicker.Button>
        <DatetimePicker.Title>选项过滤器</DatetimePicker.Title>
        <DatetimePicker.Button>确认</DatetimePicker.Button>
      </DatetimePicker.Toolbar>
    </DatetimePicker>
  )
}

function DateHourPicker() {
  const [minDate] = useState(new Date(2020, 0, 1, 0))
  const [maxDate] = useState(new Date(2025, 10, 1, 23))
  const [value, setValue] = useState(new Date())

  return (
    <DatetimePicker type="date-hour" value={value} min={minDate} max={maxDate} onChange={setValue}>
      <DatetimePicker.Toolbar>
        <DatetimePicker.Button>取消</DatetimePicker.Button>
        <DatetimePicker.Title>选择年月日小时</DatetimePicker.Title>
        <DatetimePicker.Button>确认</DatetimePicker.Button>
      </DatetimePicker.Toolbar>
    </DatetimePicker>
  )
}

function DatePickerWithFields() {
  const [minDate] = useState(new Date(2020, 0, 1))
  const [maxDate] = useState(new Date(2025, 10, 1))
  const [value, setValue] = useState(new Date(2021, 0, 17))
  return (
    <DatetimePicker
      type="date"
      fields={["month", "day", "year"]}
      value={value}
      min={minDate}
      max={maxDate}
      formatter={(type, val) => {
        if (type === "year") {
          return val + "年"
        }
        if (type === "month") {
          return val + "月"
        }
        if (type === "day") {
          return val + "日"
        }
        return val
      }}
      onChange={setValue}
    >
      <DatetimePicker.Toolbar>
        <DatetimePicker.Button>取消</DatetimePicker.Button>
        <DatetimePicker.Title>自定义列排序</DatetimePicker.Title>
        <DatetimePicker.Button>确认</DatetimePicker.Button>
      </DatetimePicker.Toolbar>
    </DatetimePicker>
  )
}

export default function PickerDemo() {
  return (
    <Page title="DatetimePicker 时间选择" className="datetime-picker-demo">
      <Block variant="card" title="选择年月日">
        <DatePicker />
      </Block>
      <Block variant="card" title="选择年月">
        <YearMonthPicker />
      </Block>
      <Block variant="card" title="选择月日">
        <MonthDayPicker />
      </Block>
      <Block variant="card" title="选择时间">
        <TimePicker />
      </Block>
      <Block variant="card" title="选择完整时间">
        <DateTimePicker />
      </Block>
      <Block variant="card" title="选项过滤器">
        <TimePickerWithFilter />
      </Block>
      <Block variant="card" title="选择年月日小时">
        <DateHourPicker />
      </Block>
      <Block variant="card" title="自定义列排序">
        <DatePickerWithFields />
      </Block>
    </Page>
  )
}
