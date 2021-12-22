import * as _ from "lodash"

const REGEX_FORMAT = /\[([^\]]+)]|D{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|S{1,3}/g

export interface CountdownInstance {
  start(): void

  pause(): void

  stop(): void

  restart(): void

  reset(): void
}

export interface CurrentTime {
  total: number
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

function padZero(num: number | string, targetLength = 2): string {
  return _.padStart(_.toString(num), targetLength, "0")
}

function rightCurrentTime(format: string, currentTime: CurrentTime): CurrentTime {
  const { total, days } = currentTime
  let { hours, minutes, seconds, milliseconds } = currentTime

  if (!format.includes("D")) {
    hours += days * 24
  }

  if (!format.includes("H") && !format.includes("h")) {
    minutes += hours * 60
  }

  if (!format.includes("m")) {
    seconds += minutes * 60
  }

  if (!format.includes("s")) {
    milliseconds += seconds * 1000
  }

  return { total, days, hours, minutes, seconds, milliseconds }
}

export function parseFormat(format: string, currentTime: CurrentTime): string {
  const { days, hours, minutes, seconds, milliseconds } = rightCurrentTime(format, currentTime)

  const matches = {
    D: days,
    DD: padZero(days),
    H: hours,
    HH: padZero(hours),
    m: minutes,
    mm: padZero(minutes),
    s: seconds,
    ss: padZero(seconds),
    S: padZero(milliseconds, 3).charAt(0),
    SS: padZero(milliseconds, 3).slice(0, 2),
    SSS: padZero(milliseconds, 3),
  }

  return _.replace(format, REGEX_FORMAT, (match, $1) => $1 || _.get(matches, match))
}
