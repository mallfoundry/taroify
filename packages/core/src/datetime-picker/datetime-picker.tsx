import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useMemo } from "react"
import Picker from "../picker"
import {
  clampDate,
  DatetimePickerColumnType,
  DatetimePickerType,
  getDatetime,
  MAX_DATE,
  MIN_DATE,
  useDatetimeRanges,
} from "./datetime-picker.shared"

interface UseDatetimePicker {
  type?: DatetimePickerType
  value?: Date
  min?: Date
  max?: Date
  fields?: DatetimePickerColumnType[]

  filter?(type: DatetimePickerColumnType, values: string[]): string[]

  formatter?(type: DatetimePickerColumnType, value: string): string
}

const defaultFormatter = (type: DatetimePickerColumnType, value: string) => value

export function useDatetimePicker(options: UseDatetimePicker = {}) {
  const {
    value = new Date(),
    min: minDate = MIN_DATE,
    max: maxDate = MAX_DATE,
    type = "datetime",
    fields = [],
    filter,
    formatter = defaultFormatter,
  } = options

  const clampValue = clampDate(value, minDate, maxDate)

  const ranges = useDatetimeRanges(clampValue, minDate, maxDate, type, fields)

  const columns = useMemo(
    () =>
      _.map(ranges, ({ type, range }) => {
        let values = _.times(range[1] - range[0] + 1, (index) =>
          _.padStart(`${range[0] + index}`, 2, "0"),
        )

        if (filter) {
          values = filter(type, values)
        }

        const options = _.map(values, (value) => ({
          value,
          children: formatter(type, value),
        }))

        return {
          type,
          options,
        }
      }),
    [filter, formatter, ranges],
  )

  function toDate(datetimeValue: string[]): Date {
    const date = new Date(minDate.getTime())
    _.forEach(columns, ({ type }, index) => {
      switch (type) {
        case "year":
          date.setFullYear(_.toNumber(_.get(datetimeValue, index)))
          break
        case "month":
          date.setMonth(_.toNumber(_.get(datetimeValue, index)) - 1)
          break
        case "day":
          date.setDate(_.toNumber(_.get(datetimeValue, index)))
          break
        case "hour":
          date.setHours(_.toNumber(_.get(datetimeValue, index)))
          break
        case "minute":
          date.setMinutes(_.toNumber(_.get(datetimeValue, index)))
          break
        case "second":
          date.setSeconds(_.toNumber(_.get(datetimeValue, index)))
          break
      }
    })

    return date
  }

  function toValue(date: Date) {
    const [year, month, day, hour, minute, second] = getDatetime(date)
    return _.map(columns, (column) => {
      switch (column.type) {
        case "year":
          return _.toString(year)
        case "month":
          return _.padStart(_.toString(month), 2, "0")
        case "day":
          return _.padStart(_.toString(day), 2, "0")
        case "hour":
          return _.padStart(_.toString(hour), 2, "0")
        case "minute":
          return _.padStart(_.toString(minute), 2, "0")
        case "second":
          return _.padStart(_.toString(second), 2, "0")
        default:
          return ""
      }
    })
  }

  return {
    toDate,
    value: toValue(clampValue),
    columns,
  }
}

export interface DatetimePickerProps {
  className?: string
  type?: DatetimePickerType
  fields?: DatetimePickerColumnType[]
  value?: Date
  min?: Date
  max?: Date
  readonly?: boolean
  loading?: boolean
  siblingCount?: number
  children?: ReactNode

  filter?(type: DatetimePickerColumnType, values: string[]): string[]

  formatter?(type: DatetimePickerColumnType, value: string): string

  onChange?(date: Date): void

  onConfirm?(date: Date): void

  onCancel?(date: Date): void
}

function DatetimePicker(props: DatetimePickerProps) {
  const {
    className,
    readonly,
    loading,
    siblingCount,
    children,
    onChange,
    onConfirm,
    onCancel,
  } = props
  const { value, columns, toDate } = useDatetimePicker(props)

  return (
    <Picker
      className={className}
      readonly={readonly}
      loading={loading}
      siblingCount={siblingCount}
      value={value}
      onChange={(aValue) => onChange?.(toDate(aValue))}
      onConfirm={(aValue) => onConfirm?.(toDate(aValue))}
      onCancel={(aValue) => onCancel?.(toDate(aValue))}
    >
      {children}
      {
        //
        _.map(columns, ({ type, options }) => (
          <Picker.Column key={type}>
            {
              //
              _.map(options, ({ value, children }) => (
                <Picker.Option key={value} value={value} children={children} />
              ))
            }
          </Picker.Column>
        ))
      }
    </Picker>
  )
}

export default DatetimePicker
