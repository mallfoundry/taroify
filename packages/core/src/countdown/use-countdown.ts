import * as _ from "lodash"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cancelRaf, raf } from "../utils/raf"
import { CurrentTime } from "./countdown.shared"

type CountdownStatus = "started" | "paused" | "stopped"

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function parseTime(time: number): CurrentTime {
  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOUR)
  const minutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const milliseconds = Math.floor(time % SECOND)

  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  }
}

function isSameTime(time1: number, time2: number, interval: number): boolean {
  return Math.floor(time1 / interval) === Math.floor(time2 / interval)
}

export interface UseCountdownOptions {
  value: number
  autostart?: boolean
  interval?: number

  onChange?(current: CurrentTime): void

  onComplete?(): void
}

export default function useCountdown(options: UseCountdownOptions) {
  const {
    value,
    autostart: autostartProp,
    interval: intervalOption = 1000,
    onChange,
    onComplete,
  } = options

  const interval = _.clamp(intervalOption, 1)

  const rafIdRef = useRef<number>()

  const statusRef = useRef<CountdownStatus>()

  const endTimeRef = useRef<number>(0)
  const countingRef = useRef<boolean>()

  const [remain, setRemain] = useState(value)

  const current = useMemo(() => parseTime(remain), [remain])

  const pause = useCallback(() => {
    countingRef.current = false
    statusRef.current = "paused"
    if (rafIdRef.current) {
      cancelRaf(rafIdRef.current)
    }
  }, [])

  const getCurrentRemain = () => Math.max(endTimeRef.current - Date.now(), 0)

  const nextRemain = useCallback(
    (value: number) => {
      setRemain(value)
      onChange?.(current)
      if (value === 0) {
        pause()
        onComplete?.()
      }
    },
    [current, onChange, onComplete, pause],
  )

  const macroTick = useCallback(() => {
    rafIdRef.current = raf(() => {
      // in case of call reset immediately after finish
      if (countingRef.current) {
        const remainRemain = getCurrentRemain()

        if (!isSameTime(remainRemain, remain, interval) || remainRemain === 0) {
          nextRemain(remainRemain)
        }
        if (remain > 0) {
          macroTick()
        }
      }
    })
  }, [interval, nextRemain, remain])

  const tick = useCallback(macroTick, [macroTick])

  const start = useCallback(
    () => {
      if (!countingRef.current) {
        if (_.includes(["stopped", undefined], statusRef.current)) {
          endTimeRef.current = Date.now() + remain
        }
        statusRef.current = "started"
        countingRef.current = true
        tick()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const stop = useCallback(
    () => {
      pause()
      statusRef.current = "stopped"
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const autostart = useCallback(
    () => {
      if (autostartProp) {
        start()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const reset = useCallback(
    () => {
      stop()
      autostart()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const restart = useCallback(
    () => {
      stop()
      start()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(
    () => autostart(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return useMemo(
    () => ({
      current,
      start,
      reset,
      restart,
      pause,
      stop,
    }),
    [current, pause, reset, restart, start, stop],
  )
}
