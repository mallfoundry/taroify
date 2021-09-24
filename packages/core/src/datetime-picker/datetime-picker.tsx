import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useMemo } from "react"
import Picker from "../picker"
import {
  clampDate,
  DatetimePickerColumnType,
  DatetimePickerColumnTypeString,
  DatetimePickerType,
  DatetimePickerTypeString,
  getDatetime,
  MAX_DATE,
  MIN_DATE,
  useDatetimeRanges,
} from "./datetime-picker.shared"

interface UseDatetimePicker {
  value?: Date
  minDate?: Date
  maxDate?: Date
  type?: DatetimePickerType | DatetimePickerTypeString

  filter?(
    type: DatetimePickerColumnType | DatetimePickerColumnTypeString,
    values: string[],
  ): string[]

  formatter?(type: DatetimePickerColumnType | DatetimePickerColumnTypeString, value: string): string
}

const defaultFormatter = (
  type: DatetimePickerColumnType | DatetimePickerColumnTypeString,
  value: string,
) => value

export function useDatetimePicker(options: UseDatetimePicker = {}) {
  const {
    value = new Date(),
    minDate = MIN_DATE,
    maxDate = MAX_DATE,
    type = DatetimePickerType.Datetime,
    filter,
    formatter = defaultFormatter,
  } = options

  const clampValue = clampDate(value, minDate, maxDate)

  const ranges = useDatetimeRanges(type, clampValue, minDate, maxDate)

  const columns = useMemo(
    () =>
      _.map(ranges, ({ type, range: rangeArr }) => {
        let values = _.times(rangeArr[1] - rangeArr[0] + 1, (index) =>
          _.padStart(`${rangeArr[0] + index}`, 2, "0"),
        )

        if (filter) {
          values = filter(type, values)
        }

        if (formatter !== defaultFormatter) {
          values = _.map(values, (value) => formatter(type, value))
        }

        return {
          type,
          values,
        }
      }),
    [filter, formatter, ranges],
  )

  function toDate(datetimeValue: string[]): Date {
    const date = new Date()
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
          return formatter("year", `${year}`)
        case "month":
          return formatter("month", _.padStart(`${month}`, 2, "0"))
        case "day":
          return formatter("day", _.padStart(`${day}`, 2, "0"))
        case "hour":
          return formatter("hour", _.padStart(`${hour}`, 2, "0"))
        case "minute":
          return formatter("minute", _.padStart(`${minute}`, 2, "0"))
        case "second":
          return formatter("second", _.padStart(`${second}`, 2, "0"))
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
  type?: DatetimePickerType | DatetimePickerTypeString
  value?: Date
  minDate?: Date
  maxDate?: Date
  loading?: boolean
  siblingCount?: number
  children?: ReactNode

  filter?(
    type: DatetimePickerColumnType | DatetimePickerColumnTypeString,
    values: string[],
  ): string[]

  formatter?(type: DatetimePickerColumnType | DatetimePickerColumnTypeString, value: string): string

  onChange?(date: Date): void

  onConfirm?(date: Date): void

  onCancel?(date: Date): void
}

function DatetimePicker(props: DatetimePickerProps) {
  const { className, loading, siblingCount, children, onChange, onConfirm, onCancel } = props
  const { value, columns, toDate } = useDatetimePicker(props)
  return (
    <Picker
      className={className}
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
        _.map(columns, ({ type, values }) => (
          <Picker.Column key={type}>
            {
              //
              _.map(values, (option) => (
                <Picker.Option key={option} children={option} />
              ))
            }
          </Picker.Column>
        ))
      }
    </Picker>
  )
}

export default DatetimePicker
