import { useCallback, useEffect, useMemo, useRef } from "react"
import { useMemoizedFn, useUpdate } from "../hooks"
import { cancelRaf, raf } from "../utils/raf"
import { useToRef } from "../utils/state"
import type { CurrentTime } from "./countdown.shared"

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
    value: valueProp,
    autostart: autostartProp,
    interval: intervalOption = 1000,
    onChange,
    onComplete,
  } = options

  const update = useUpdate()

  const intervalRef = useToRef(Math.max(intervalOption, 1))

  const valueRef = useToRef(valueProp)

  const autostartRef = useToRef(autostartProp)

  const rafIdRef = useRef<number>()

  const statusRef = useRef<CountdownStatus>()

  const endTimeRef = useRef<number>(0)

  const remainRef = useRef(valueProp)

  const current = parseTime(remainRef.current)
  // Set the current toRef when rerendering
  const currentRef = useToRef(current)

  const macroTick = useMemoizedFn(() => {
    rafIdRef.current = raf(() => {
      // in case of call reset immediately after finish
      if (statusRef.current === "started") {
        const remain = Math.max(endTimeRef.current - Date.now(), 0)

        if (!isSameTime(remain, remainRef.current, intervalRef.current) || remain === 0) {
          remainRef.current = remain
          update()
          // current is immutable,
          // Use the currentRef value instead of the current
          onChange?.(currentRef.current)
          if (remain === 0) {
            stop()
            onComplete?.()
          }
        }
        if (remainRef.current > 0) {
          macroTick()
        }
      }
    })
  })

  const clearRaf = useCallback(() => {
    if (rafIdRef.current) {
      cancelRaf(rafIdRef.current)
    }
  }, [])

  const pause = useCallback(() => {
    clearRaf()
    statusRef.current = "paused"
  }, [clearRaf])

  const stop = useCallback(() => {
    clearRaf()
    statusRef.current = "stopped"
  }, [clearRaf])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const start = useCallback(() => {
    if (statusRef.current !== "started") {
      // If status is paused, set endTime to now() + remain.
      // If status is stopped, set endTime to now() + initial value.
      endTimeRef.current =
        Date.now() + (statusRef.current === "paused" ? remainRef.current : valueRef.current)
      statusRef.current = "started"
      macroTick()
    }
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const autostart = useCallback(() => {
    if (autostartRef.current) {
      start()
    }
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const reset = useCallback(() => {
    stop()
    autostart()
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const restart = useCallback(() => {
    stop()
    start()
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    autostart()

    return () => {
      stop()
    }
  }, [])

  // Update remain to next value
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => restart(), [valueProp])

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
