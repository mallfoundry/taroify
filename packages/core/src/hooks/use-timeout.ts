import { useCallback, useMemo, useRef } from "react"

type UseTimeoutCallback = (...args: any[]) => void

function useTimeout() {
  const timerRef = useRef<NodeJS.Timeout>()

  const cbRef = useRef<UseTimeoutCallback>()
  const msRef = useRef<number>()
  const argsRef = useRef<any[]>()

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = undefined
    }
  }, [])

  const start = useCallback((callback: UseTimeoutCallback, ms?: number, ...args: any[]) => {
    if (timerRef.current) {
      return
    }
    cbRef.current = callback
    msRef.current = ms
    argsRef.current = args
    timerRef.current = setTimeout(callback, ms, args)
  }, [])

  const restart = useCallback(
    (callback?: UseTimeoutCallback, ms?: number, ...args: any[]) => {
      stop()
      if (callback) {
        start(callback, ms, args)
      } else if (cbRef.current) {
        start(cbRef.current, msRef.current, argsRef.current)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return useMemo(
    () => ({
      restart,
      start,
      stop,
    }),
    [restart, start, stop],
  )
}

export default useTimeout
