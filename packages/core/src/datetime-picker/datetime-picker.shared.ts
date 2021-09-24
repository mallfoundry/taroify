import * as _ from "lodash"
import { useMemo } from "react"

export enum DatetimePickerType {
  Date = "date",
  Time = "time",
  Datetime = "datetime",
  DateHour = "date-hour",
  HourMinute = "hour-minute",
  MonthDay = "month-day",
  YearMonth = "year-month",
}

export type DatetimePickerTypeString =
  | "date"
  | "time"
  | "datetime"
  | "date-hour"
  | "hour-minute"
  | "month-day"
  | "year-month"

export enum DatetimePickerColumnType {
  Year = "year",
  Month = "month",
  Day = "day",
  Hour = "hour",
  Minute = "minute",
  Second = "second",
}

export type DatetimePickerColumnTypeString = "year" | "month" | "day" | "hour" | "minute" | "second"

type Datetime = [number, number, number, number, number, number]

const CURRENT_YEAR = new Date().getFullYear()

export const MIN_DATE = new Date(CURRENT_YEAR - 10, 0, 1, 0, 0, 0)

export const MAX_DATE = new Date(CURRENT_YEAR + 10, 11, 31, 59, 59, 59)

export function getEndDayOfMonth(year: number, month: number): number {
  return 32 - new Date(year, month - 1, 32).getDate()
}

export function clampDate(value: Date, minDate: Date, maxDate: Date) {
  const timestamp = _.clamp(value.getTime(), minDate.getTime(), maxDate.getTime())
  return new Date(timestamp)
}

export function getDatetime(date: Date): Datetime {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ]
}

function getBoundaryDatetime(type: "max" | "min", boundary: Date, current: Date): Datetime {
  const year = boundary.getFullYear()
  let month = 1
  let day = 1
  let hour = 0
  let minute = 0
  let second = 0

  if (type === "max") {
    month = 12
    day = getEndDayOfMonth(current.getFullYear(), current.getMonth() + 1)
    hour = 23
    minute = 59
    second = 59
  }
  if (current.getFullYear() === year) {
    month = boundary.getMonth() + 1
    if (current.getMonth() + 1 === month) {
      day = boundary.getDate()
      if (current.getDate() === day) {
        hour = boundary.getHours()
        if (current.getHours() === hour) {
          minute = boundary.getMinutes()
          if (current.getMinutes() === minute) {
            second = boundary.getSeconds()
          }
        }
      }
    }
  }

  return [year, month, day, hour, minute, second]
}

function getMinDatetime(boundary: Date, current: Date): Datetime {
  return getBoundaryDatetime("min", boundary, current)
}

function getMaxDatetime(boundary: Date, current: Date): Datetime {
  return getBoundaryDatetime("max", boundary, current)
}

interface DatetimeRange {
  type: DatetimePickerColumnType | DatetimePickerColumnTypeString
  range: [number, number]
}

function useAllDatetimeRanges(date: Date, minDate: Date, maxDate: Date): DatetimeRange[] {
  const [minYear, minMonth, minDay, minHour, minMinute, minSecond] = getMinDatetime(
    minDate,
    date || minDate,
  )
  const [maxYear, maxMonth, maxDay, maxHour, maxMinute, maxSecond] = getMaxDatetime(
    maxDate,
    date || minDate,
  )

  return useMemo(
    () => [
      {
        type: DatetimePickerColumnType.Year,
        range: [minYear, maxYear],
      },
      {
        type: DatetimePickerColumnType.Month,
        range: [minMonth, maxMonth],
      },
      {
        type: DatetimePickerColumnType.Day,
        range: [minDay, maxDay],
      },
      {
        type: DatetimePickerColumnType.Hour,
        range: [minHour, maxHour],
      },
      {
        type: DatetimePickerColumnType.Minute,
        range: [minMinute, maxMinute],
      },
      {
        type: DatetimePickerColumnType.Second,
        range: [minSecond, maxSecond],
      },
    ],
    [
      maxDay,
      maxHour,
      maxMinute,
      maxMonth,
      maxSecond,
      maxYear,
      minDay,
      minHour,
      minMinute,
      minMonth,
      minSecond,
      minYear,
    ],
  )
}

function useSpecifiedDatetimeRanges(
  ranges: DatetimeRange[],
  type: DatetimePickerType | DatetimePickerTypeString,
) {
  return useMemo(() => {
    switch (type) {
      case DatetimePickerType.Date:
        return _.slice(ranges, 0, 3)
      case DatetimePickerType.Time:
        return _.slice(ranges, 3, 6)
      case DatetimePickerType.YearMonth:
        return _.slice(ranges, 0, 2)
      case DatetimePickerType.MonthDay:
        return _.slice(ranges, 1, 3)
      case DatetimePickerType.DateHour:
        return _.slice(ranges, 0, 4)
      case DatetimePickerType.HourMinute:
        return _.slice(ranges, 3, 5)
    }
    return ranges
  }, [ranges, type])
}

export function useDatetimeRanges(
  type: DatetimePickerType | DatetimePickerTypeString,
  date: Date,
  minDate: Date,
  maxDate: Date,
) {
  const ranges = useAllDatetimeRanges(date, minDate, maxDate)
  return useSpecifiedDatetimeRanges(ranges, type)
}
