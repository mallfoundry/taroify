import * as _ from "lodash"
import { useMemo } from "react"
import {
  clampDate,
  DatetimePickerColumnType,
  DatetimePickerType,
  getDatetime,
  getEndDayOfMonth,
  MAX_DATE,
  MIN_DATE,
  useDatetimeRanges,
} from "./datetime-picker.shared"

interface UseDatetimePicker {
  type?: DatetimePickerType
  defaultValue?: Date
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
    defaultValue = undefined,
    value = undefined,
    min: minDate = MIN_DATE,
    max: maxDate = MAX_DATE,
    type = "datetime",
    fields = [],
    filter,
    formatter = defaultFormatter,
  } = options
  const clampDefaultValue = clampDate(defaultValue, minDate, maxDate)
  // When the defaultValue has value and the value is undefined,
  // set the value to defaultValue
  // The clampValue is value or defaultValue
  const clampValue = clampDate(value ?? defaultValue, minDate, maxDate)
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

        const children = _.map(values, (value) => ({
          value,
          children: formatter(type, value),
        }))

        return {
          type,
          value: type,
          children,
        }
      }),
    [filter, formatter, ranges],
  )

  function toDate(datetimeValue: string[]): Date {
    const date: Date = new Date(minDate.getTime())
    _.forEach(columns, ({ type }, index) => {
      switch (type) {
        case "year":
          if (_.size(datetimeValue) > index) {
            date.setFullYear(_.toNumber(datetimeValue[index]))
          }
          break
        case "month":
          if (_.size(datetimeValue) > index) {
            date.setMonth(_.toNumber(datetimeValue[index]) - 1)
          }
          break
        case "day":
          if (_.size(datetimeValue) > index) {
            const endDayOfMonth = getEndDayOfMonth(date.getFullYear(), date.getMonth() + 1)
            const day = _.toNumber(datetimeValue[index])
            date.setDate(day > endDayOfMonth ? endDayOfMonth : day)
          }
          break
        case "hour":
          if (_.size(datetimeValue) > index) {
            date.setHours(_.toNumber(datetimeValue[index]))
          }
          break
        case "minute":
          if (_.size(datetimeValue) > index) {
            date.setMinutes(_.toNumber(datetimeValue[index]))
          }
          break
        case "second":
          if (_.size(datetimeValue) > index) {
            date.setSeconds(_.toNumber(datetimeValue[index]))
          }
          break
      }
    })

    return clampDate(date, minDate, maxDate)
  }

  function toValue(date: Date | undefined) {
    if (_.isUndefined(date)) {
      return date
    }
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
    defaultValue: toValue(_.isUndefined(defaultValue) ? defaultValue : clampDefaultValue),
    value: toValue(_.isUndefined(value) ? value : clampValue),
    columns,
  }
}

export default useDatetimePicker
