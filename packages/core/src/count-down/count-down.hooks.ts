import { useCallback, useMemo, useRef, useState } from "react"
import { cancelRaf, raf } from "../utils/raf"
import { CurrentTime } from "./count-down.shared"

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

function isSameSecond(time1: number, time2: number): boolean {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000)
}

export interface UseCountDownOptions {
  time: number
  millisecond?: boolean
  onChange?: (current: CurrentTime) => void
  onFinish?: () => void
}

export function useCountDown(options: UseCountDownOptions) {
  const { time, millisecond, onChange, onFinish } = options

  const rafIdRef = useRef<number>()
  const endTimeRef = useRef<number>(0)
  const countingRef = useRef<boolean>()

  // const remain = use(options.time)
  const [remain, setRemain] = useState(time)

  const current = useMemo(() => parseTime(remain), [remain])

  const pause = () => {
    countingRef.current = false
    if (rafIdRef.current) {
      cancelRaf(rafIdRef.current)
    }
  }

  const getCurrentRemain = () => Math.max(endTimeRef.current - Date.now(), 0)

  const nextRemain = useCallback(
    (value: number) => {
      setRemain(value)
      onChange?.(current)
      if (value === 0) {
        pause()
        onFinish?.()
      }
    },
    [current, onChange, onFinish],
  )

  const microTick = useCallback(() => {
    rafIdRef.current = raf(() => {
      // in case of call reset immediately after finish
      if (countingRef.current) {
        nextRemain(getCurrentRemain())

        if (remain > 0) {
          microTick()
        }
      }
    })
  }, [nextRemain, remain])

  const macroTick = useCallback(() => {
    rafIdRef.current = raf(() => {
      // in case of call reset immediately after finish
      if (countingRef.current) {
        const remainRemain = getCurrentRemain()

        if (!isSameSecond(remainRemain, remain) || remainRemain === 0) {
          nextRemain(remainRemain)
        }
        if (remain > 0) {
          macroTick()
        }
      }
    })
  }, [nextRemain, remain])

  const tick = useCallback(() => {
    if (millisecond) {
      microTick()
    } else {
      macroTick()
    }
  }, [macroTick, microTick, millisecond])

  const start = useCallback(() => {
    if (!countingRef.current) {
      endTimeRef.current = Date.now() + remain
      countingRef.current = true
      tick()
    }
  }, [remain, tick])

  const reset = useCallback(
    (totalTime: number) => {
      pause()
      nextRemain(totalTime)
    },
    [nextRemain],
  )

  return {
    start,
    pause,
    reset,
    current,
  }
}
