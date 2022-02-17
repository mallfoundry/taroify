import { Calendar, Cell, Popup } from "@taroify/core"
import { ArrowRight } from "@taroify/icons"
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
        clickable
        rightIcon={<ArrowRight />}
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Popup
        style={{ height: "80%" }}
        open={open}
        mountOnEnter={false}
        rounded
        placement="bottom"
        onClose={setOpen}
      >
        <Calendar
          type="single"
          value={value}
          onChange={setValue}
          onConfirm={(newValue) => {
            setFormatValue(formatFullDate(newValue))
            setOpen(false)
          }}
        >
          <Calendar.Footer>
            <Calendar.Button type="confirm">确定</Calendar.Button>
          </Calendar.Footer>
        </Calendar>
      </Popup>
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
        clickable
        rightIcon={<ArrowRight />}
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Popup
        style={{ height: "80%" }}
        open={open}
        mountOnEnter={false}
        rounded
        placement="bottom"
        onClose={setOpen}
      >
        <Calendar
          type="multiple"
          value={value}
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
      </Popup>
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
        clickable
        rightIcon={<ArrowRight />}
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Popup
        style={{ height: "80%" }}
        open={open}
        mountOnEnter={false}
        rounded
        placement="bottom"
        onClose={setOpen}
      >
        <Calendar
          type="range"
          value={value}
          onChange={setValue}
          onConfirm={(newValue) => {
            setFormatValue(formatRange(newValue))
            setOpen(false)
          }}
        >
          <Calendar.Footer>
            <Calendar.Button type="confirm">确定</Calendar.Button>
          </Calendar.Footer>
        </Calendar>
      </Popup>
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
        clickable
        rightIcon={<ArrowRight />}
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Popup style={{ height: "80%" }} open={open} rounded placement="bottom" onClose={setOpen}>
        <Calendar
          type="single"
          value={value}
          onChange={setValue}
          onConfirm={(newValue) => {
            setFormatValue(formatFullDate(newValue))
            setOpen(false)
          }}
        />
      </Popup>
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
        clickable
        rightIcon={<ArrowRight />}
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Popup style={{ height: "80%" }} open={open} rounded placement="bottom" onClose={setOpen}>
        <Calendar
          type="single"
          value={value}
          onChange={setValue}
          onConfirm={(newValue) => {
            setFormatValue(formatRange(newValue))
            setOpen(false)
          }}
        />
      </Popup>
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
        clickable
        rightIcon={<ArrowRight />}
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Popup style={{ height: "80%" }} open={open} rounded placement="bottom" onClose={setOpen}>
        <Calendar
          style={{
            // @ts-ignore
            "--calendar-active-color": "#1989fa",
          }}
          type="single"
          value={value}
          onChange={setValue}
          onConfirm={(newValue) => {
            setFormatValue(formatRange(newValue))
            setOpen(false)
          }}
        />
      </Popup>
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
        clickable
        rightIcon={<ArrowRight />}
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Popup style={{ height: "80%" }} open={open} rounded placement="bottom" onClose={setOpen}>
        <Calendar
          type="range"
          min={minDate}
          max={maxDate}
          value={value}
          onChange={setValue}
          onConfirm={(newValue) => {
            setFormatValue(formatRange(newValue))
            setOpen(false)
          }}
        >
          <Calendar.Footer>
            <Calendar.Button type="confirm">确定</Calendar.Button>
          </Calendar.Footer>
        </Calendar>
      </Popup>
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
        clickable
        rightIcon={<ArrowRight />}
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Popup style={{ height: "80%" }} rounded placement="bottom" open={open} onClose={setOpen}>
        <Popup.Close />
        <Calendar
          type="range"
          value={value}
          onChange={(newValue) => {
            setValue(newValue)
            setConfirm(newValue.length === 2 ? "完成" : "请选择结束时间")
          }}
          onConfirm={(newValue) => {
            setFormatValue(formatRange(newValue))
            setOpen(false)
          }}
        >
          <Calendar.Footer>
            <Calendar.Button type="confirm">{confirm}</Calendar.Button>
          </Calendar.Footer>
        </Calendar>
      </Popup>
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
        clickable
        rightIcon={<ArrowRight />}
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Popup style={{ height: "80%" }} rounded placement="bottom" open={open} onClose={setOpen}>
        <Popup.Close />
        <Calendar
          type="range"
          min={minDate}
          max={maxDate}
          formatter={dayFormatter}
          value={value}
          onChange={setValue}
          onConfirm={(newValue) => {
            setFormatValue(formatRange(newValue))
            setOpen(false)
          }}
        >
          <Calendar.Footer>
            <Calendar.Button type="confirm">确定</Calendar.Button>
          </Calendar.Footer>
        </Calendar>
      </Popup>
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
        clickable
        rightIcon={<ArrowRight />}
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Popup style={{ height: "100%" }} placement="right" open={open} onClose={setOpen}>
        <Popup.Close />
        <Calendar
          type="single"
          value={value}
          onChange={setValue}
          onConfirm={(newValue) => {
            setFormatValue(formatFullDate(newValue))
            setOpen(false)
          }}
        >
          <Calendar.Footer>
            <Calendar.Button type="confirm">确定</Calendar.Button>
          </Calendar.Footer>
        </Calendar>
      </Popup>
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
        clickable
        rightIcon={<ArrowRight />}
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Popup style={{ height: "80%" }} open={open} rounded placement="bottom" onClose={setOpen}>
        <Calendar
          type="single"
          value={value}
          onChange={setValue}
          onConfirm={(newValue) => {
            setFormatValue(formatFullDate(newValue))
            setOpen(false)
          }}
        >
          <Calendar.Footer>
            <Calendar.Button type="confirm">确定</Calendar.Button>
          </Calendar.Footer>
        </Calendar>
      </Popup>
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
