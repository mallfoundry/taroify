import { Calendar, Cell } from "@taroify/core"
import { useState } from "react"
import Block from "../../../components/block"
import CustomWrapper from "../../../components/custom-wrapper"
import Page from "../../../components/page"
import "./index.scss"

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

function SingleCalendar() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<Date>()
  const [formatValue, setFormatValue] = useState<string>()

  return (
    <>
      <Cell
        title="选择单个日期"
        isLink
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Calendar
        type="single"
        value={value}
        poppable
        show={open}
        onClose={setOpen}
        onChange={setValue}
        onConfirm={(newValue) => {
          setFormatValue(formatFullDate(newValue))
        }}
      >
        <Calendar.Footer>
          <Calendar.Button type="confirm">确定</Calendar.Button>
        </Calendar.Footer>
      </Calendar>
    </>
  )
}

function MultipleCalendar() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<Date[]>([])
  const [formatValue, setFormatValue] = useState<string>()

  return (
    <>
      <Cell
        title="选择多个日期"
        isLink
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Calendar
        type="multiple"
        value={value}
        poppable
        show={open}
        onClose={setOpen}
        onChange={setValue}
        onConfirm={(newValue) => {
          setFormatValue(formatMultiple(newValue))
          setOpen(false)
        }}
      >
        <Calendar.Footer>
          <Calendar.Button type="confirm">确定</Calendar.Button>
        </Calendar.Footer>
      </Calendar>
    </>
  )
}

function RangeCalendar() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<Date[]>([])
  const [formatValue, setFormatValue] = useState<string>()

  return (
    <>
      <Cell
        title="选择日期区间"
        isLink
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Calendar
        type="range"
        value={value}
        onChange={setValue}
        poppable
        show={open}
        onClose={setOpen}
        onConfirm={(newValue) => {
          setFormatValue(formatRange(newValue))
          setOpen(false)
        }}
      >
        <Calendar.Footer>
          <Calendar.Button type="confirm">确定</Calendar.Button>
        </Calendar.Footer>
      </Calendar>
    </>
  )
}

function SingleQuicklyCalendar() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<Date>()
  const [formatValue, setFormatValue] = useState<string>()

  return (
    <>
      <Cell
        title="选择单个日期"
        isLink
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Calendar
        type="single"
        value={value}
        onChange={setValue}
        poppable
        show={open}
        onClose={setOpen}
        onConfirm={(newValue) => {
          setFormatValue(formatFullDate(newValue))
          setOpen(false)
        }}
      />
    </>
  )
}

function RangeQuicklyCalendar() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<[]>([])
  const [formatValue, setFormatValue] = useState<string>()

  return (
    <>
      <Cell
        title="选择日期区间"
        isLink
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Calendar
        type="single"
        value={value}
        onChange={setValue}
        poppable
        show={open}
        onClose={setOpen}
        onConfirm={(newValue) => {
          setFormatValue(formatRange(newValue))
          setOpen(false)
        }}
      />
    </>
  )
}

function CustomColorCalendar() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<[]>([])
  const [formatValue, setFormatValue] = useState<string>()

  return (
    <>
      <Cell
        title="自定义颜色"
        isLink
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Calendar
        style={{
          // @ts-ignore
          "--calendar-active-color": "red",
        }}
        type="single"
        value={value}
        onChange={setValue}
        poppable
        show={open}
        onClose={setOpen}
        onConfirm={(newValue) => {
          setFormatValue(formatRange(newValue))
          setOpen(false)
        }}
      />
    </>
  )
}

function CustomRangeCalendar() {
  const [minDate] = useState(new Date(2010, 0, 1))
  const [maxDate] = useState(new Date(2010, 0, 31))
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<Date[]>([])
  const [formatValue, setFormatValue] = useState<string>()

  return (
    <>
      <Cell
        title="自定义日期范围"
        isLink
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Calendar
        type="range"
        min={minDate}
        max={maxDate}
        value={value}
        onChange={setValue}
        poppable
        show={open}
        onClose={setOpen}
        onConfirm={(newValue) => {
          setFormatValue(formatRange(newValue))
          setOpen(false)
        }}
      >
        <Calendar.Footer>
          <Calendar.Button type="confirm">确定</Calendar.Button>
        </Calendar.Footer>
      </Calendar>
    </>
  )
}

function CustomConfirmCalendar() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<Date[]>([])
  const [confirm, setConfirm] = useState("请选择结束时间")
  const [formatValue, setFormatValue] = useState<string>()

  return (
    <>
      <Cell
        title="自定义按钮"
        isLink
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Calendar
        type="range"
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
          setConfirm(newValue.length === 2 ? "完成" : "请选择结束时间")
        }}
        poppable
        show={open}
        onClose={setOpen}
        onConfirm={(newValue) => {
          setFormatValue(formatRange(newValue))
          setOpen(false)
        }}
      >
        <Calendar.Footer>
          <Calendar.Button type="confirm">{confirm}</Calendar.Button>
        </Calendar.Footer>
      </Calendar>
    </>
  )
}

function CustomDayCalendar() {
  const [open, setOpen] = useState(false)
  const [minDate] = useState(new Date(2010, 4, 1))
  const [maxDate] = useState(new Date(2010, 4, 31))
  const [value, setValue] = useState<Date[]>([])
  const [formatValue, setFormatValue] = useState<string>()

  return (
    <>
      <Cell
        title="自定义日期文案"
        isLink
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Calendar
        type="range"
        min={minDate}
        max={maxDate}
        formatter={dayFormatter}
        value={value}
        onChange={setValue}
        poppable
        show={open}
        onClose={setOpen}
        onConfirm={(newValue) => {
          setFormatValue(formatRange(newValue))
          setOpen(false)
        }}
      >
        <Calendar.Footer>
          <Calendar.Button type="confirm">确定</Calendar.Button>
        </Calendar.Footer>
      </Calendar>
    </>
  )
}

function CustomPositionCalendar() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<Date>()
  const [formatValue, setFormatValue] = useState<string>()

  return (
    <>
      <Cell
        title="自定义弹出位置"
        isLink
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Calendar
        popupPlacement="right"
        type="single"
        value={value}
        onChange={setValue}
        poppable
        show={open}
        onClose={setOpen}
        onConfirm={(newValue) => {
          setFormatValue(formatFullDate(newValue))
          setOpen(false)
        }}
      >
        <Calendar.Footer>
          <Calendar.Button type="confirm">确定</Calendar.Button>
        </Calendar.Footer>
      </Calendar>
    </>
  )
}

function CustomFirstDayOfWeekCalendar() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<Date>()
  const [formatValue, setFormatValue] = useState<string>()

  return (
    <>
      <Cell
        title="自定义周起始日"
        isLink
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Calendar
        popupCloseIcon={false}
        popupRounded={false}
        type="single"
        value={value}
        onChange={setValue}
        poppable
        show={open}
        onClose={setOpen}
        firstDayOfWeek={1}
        onConfirm={(newValue) => {
          setFormatValue(formatFullDate(newValue))
          setOpen(false)
        }}
      >
        <Calendar.Footer>
          <Calendar.Button type="confirm">确定</Calendar.Button>
        </Calendar.Footer>
      </Calendar>
    </>
  )
}

function TiledCalendar() {
  const [minDate] = useState(new Date(2012, 1, 10))
  const [maxDate] = useState(new Date(2012, 10, 20))
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

export default function CalendarDemo() {
  return (
    <Page title="Calendar 日历" className="calendar-demo">
      <Block title="基础用法">
        <Cell.Group clickable inset>
          <CustomWrapper>
            <SingleCalendar />
          </CustomWrapper>
          <CustomWrapper>
            <MultipleCalendar />
          </CustomWrapper>
          <CustomWrapper>
            <RangeCalendar />
          </CustomWrapper>
        </Cell.Group>
      </Block>
      <Block title="快捷选择">
        <Cell.Group clickable inset>
          <CustomWrapper>
            <SingleQuicklyCalendar />
          </CustomWrapper>
          <CustomWrapper>
            <RangeQuicklyCalendar />
          </CustomWrapper>
        </Cell.Group>
      </Block>
      <Block title="自定义日历">
        <Cell.Group clickable inset>
          <CustomWrapper>
            <CustomColorCalendar />
          </CustomWrapper>
          <CustomWrapper>
            <CustomRangeCalendar />
          </CustomWrapper>
          <CustomWrapper>
            <CustomConfirmCalendar />
          </CustomWrapper>
          <CustomWrapper>
            <CustomDayCalendar />
          </CustomWrapper>
          <CustomWrapper>
            <CustomPositionCalendar />
          </CustomWrapper>
          <CustomWrapper>
            <CustomFirstDayOfWeekCalendar />
          </CustomWrapper>
        </Cell.Group>
      </Block>
      <Block variant="card" title="平铺展示">
        <TiledCalendar />
      </Block>
    </Page>
  )
}
