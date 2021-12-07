import { DependencyList, useCallback, useEffect, useMemo, useRef } from "react"

function useTimeoutEffect(callback: (...args: any[]) => void, ms?: number, deps?: DependencyList) {
  const timerRef = useRef<NodeJS.Timeout>()

  const start = useCallback(() => (timerRef.current = setTimeout(callback, ms)), [callback, ms])

  const stop = useCallback(() => timerRef.current && clearTimeout(timerRef.current), [])

  useEffect(
    () => {
      start()
      return stop
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  )

  return useMemo(
    () => ({
      start,
      stop,
    }),
    [start, stop],
  )
}

export default useTimeoutEffect
