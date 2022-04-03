# Calendar 日历

### 介绍

日历组件用于选择日期或日期区间。

### 引入

```tsx
import { Calendar } from "@taroify/core"
```

## 代码演示

### 选择单个日期

下面演示了结合单元格来使用日历组件的用法，日期选择完成后会触发 `onConfirm` 事件。

```tsx
function formatFullDate(date?: Date) {
  if (date) {
    return `${date.getFullYear()}/${formatDate(date)}`
  }
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
```

### 选择多个日期

设置 `type` 为 `multiple` 后可以选择多个日期，此时 `onConfirm` 事件处理 value 数组结构，数组包含若干个选中的日期。

```tsx
function formatMultiple(dates: Date[]) {
  if (dates.length) {
    return `选择了 ${dates.length} 个日期`
  }
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
      <Popup style={{ height: "80%" }} open={open} rounded placement="bottom" onClose={setOpen}>
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
```

### 选择日期区间

设置 `type` 为 `range` 后可以选择日期区间，此时 `onConfirm` 事件处理 value 数组结构，数组第一项为开始时间，第二项为结束时间。

```tsx
function formatRange(dateRange: Date[]) {
  if (dateRange.length) {
    const [start, end] = dateRange
    return `${formatDate(start)} - ${formatDate(end)}`
  }
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
      <Popup style={{ height: "80%" }} open={open} rounded placement="bottom" onClose={setOpen}>
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
```

### 快捷选择

不设置 `Calendar.Button` 组件可以隐藏确认按钮，这种情况下选择完成后会立即触发 `onConfirm` 事件。

```tsx
function QuicklyCalendar() {
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
```

### 自定义颜色

通过 `css` 可以自定义日历的颜色，对选中日期和底部按钮生效。

```tsx
<Calendar style={{ "--calendar-active-color": "#1989fa" }} />
```

### 自定义日期范围

通过 `min` 和 `max` 定义日历的范围。

```tsx
function CustomRangeCalendar() {
  const [minDate] = useState(new Date(2010, 0, 1))
  const [maxDate] = useState(new Date(2010, 0, 31))

  return (
    <Calendar min={minDate} max={maxDate} />
  )
}
```

### 自定义按钮文字

通过 `Calendar.Button` 组件设置按钮文字。

```tsx
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
```

### 自定义日期文案

通过传入 `formatter` 函数来对日历上每一格的内容进行格式化。

```tsx
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
```

### 自定义弹出位置

通过 `placement` 属性自定义弹出层的弹出位置，可选值为 `top`、`left`、`right`。

```tsx
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
```

### 自定义周起始日

通过 `firstDayOfWeek` 属性设置一周从哪天开始。

```tsx
<Calendar firstDayOfWeek={1} />
```

### 平铺展示

将 `css` 设置为 高度，日历会直接展示在页面内，而不是以弹层的形式出现。

```tsx
<Calendar style={{ height: "500px" }} title="日历" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 选择类型:<br>`single` 表示选择单个日期，<br>`multiple` 表示选择多个日期，<br>`range` 表示选择日期区间 | _string_ | `single` |
| defaultValue | 默认选中的日期，`type` 为 `multiple` 或 `range` 时为数组，传入 `null` 表示默认不选择 | _Date \| Date[] \| null_ | 今天 |
| value | 选中的日期，`type` 为 `multiple` 或 `range` 时为数组，传入 `null` 表示默认不选择 | _Date \| Date[] \| null_ | 今天 |
| formatter | 日期格式化函数 | _(day: Calendar.DayObject) => Calendar.DayObject_ | - |
| title | 日历标题 | _string_ | `日期选择` |
| subtitle | 是否展示日历副标题（年月） | _boolean_ | `true` |
| min | 可选择的最小日期 | _Date_ | 当前日期 |
| max | 可选择的最大日期 | _Date_ | 当前日期的六个月后 |
| readonly | 是否为只读状态，只读状态下不能选择日期 | _boolean_ | `false` |
| firstDayOfWeek | 设置周起始日 | _0-6_ | `0` |

### Calendar.DayObject 数据结构

日历中的每个日期都对应一个 Day 对象，通过`formatter`属性可以自定义 Day 对象的内容

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| date | 日期对应的 Date 对象 | _Date_ |
| type | 日期类型，可选值为 `active` `start` `middle` `end` `disabled` | _string_ |
| children | 中间显示的文字 | _string_ |
| top | 上方的提示信息 | _string_ |
| bottom | 下方的提示信息 | _string_ |
| className | 额外类名 | _string_ |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onChange | 点击并选中任意日期时触发 | _value: Date \| Date[]_ |
| onConfirm | 日期选择完成后触发，若使用 `Calendar.Button` 组件，则点击确认按钮后触发 | _value: Date \| Date[]_ |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                         | 默认值                                                | 描述  |
|--------------------------------------------|----------------------------------------------------|-----|
| --calendar-active-color                    | _var(--danger-color)_                              | -   |
| --calendar-background-color                | _var(--white)_                                     | -   |
| --calendar-header-box-shadow               | _0 2px * $hd 10px * $hd rgba(125, 126, 128, 0.16)_ | -   |
| --calendar-header-title-height             | _44px * $hd_                                       | -   |
| --calendar-header-title-font-size          | _var(--font-size-lg)_                              | -   |
| --calendar-header-subtitle-font-size       | _var(--font-size-md)_                              | -   |
| --calendar-weekdays-height                 | _30px * $hd_                                       | -   |
| --calendar-weekdays-font-size              | _var(--font-size-sm)_                              | -   |
| --calendar-month-title-font-size           | _var(--font-size-md)_                              | -   |
| --calendar-month-watermark-color           | _rgba(242, 243, 245, 0.8)_                         | -   |
| --calendar-month-watermark-font-size       | _160px * $hd_                                      | -   |
| --calendar-range-edge-color                | _var(--white)_                                     | -   |
| --calendar-range-edge-background-color     | _var(--calendar-active-color)_                     | -   |
| --calendar-range-middle-color              | _var(--calendar-active-color)_                     | -   |
| --calendar-range-middle-background-opacity | _0.1_                                              | -   |
| --calendar-day-height                      | _64px * $hd_                                       | -   |
| --calendar-day-font-size                   | _var(--font-size-lg)_                              | -   |
| --calendar-day-disabled-color              | _var(--gray-5)_                                    | -   |
| --calendar-active-day-size                 | _54px * $hd_                                       | -   |
| --calendar-active-day-color                | _var(--white)_                                     | -   |
| --calendar-active-day-background-color     | _var(--calendar-active-color)_                     | -   |
| --calendar-active-day-border-radius        | _var(--border-radius-md)_                          | -   |
| --calendar-day-info-font-size              | _var(--font-size-xs)_                              | -   |
| --calendar-day-info-line-height            | _var(--line-height-xs)_                            | -   |
| --calendar-confirm-button-height           | _36px * $hd_                                       | -   |
| --calendar-confirm-button-margin           | _7px * $hd 0_                                      | -   |
| --calendar-confirm-button-color            | _var(--calendar-active-color)_                     | -   |
| --calendar-footer-padding                  | _0 var(--padding-md)_                              | -   |
