import { useForceUpdate } from "@taroify/hooks"
import * as _ from "lodash"
import { createRef, MutableRefObject, useCallback, useEffect, useMemo, useRef } from "react"

export { useToRef } from "@taroify/hooks"

export function usePreviousRef<T = any>(value: T): MutableRefObject<T> {
  const previousRef = useRef<T>(value)
  useEffect(() => {
    previousRef.current = value
  })
  return previousRef
}

export function usePrevious<T>(state: T): T | undefined {
  return usePreviousRef(state).current
}

type UseRenderedCallback<T> = () => T

export function useRendered<T = any>(cb: UseRenderedCallback<T>): T {
  return cb?.()
}

export function useRenderedRef<T = any>(cb: UseRenderedCallback<T>): MutableRefObject<T> {
  const stateRef = useRef<T>()
  if (cb) {
    stateRef.current = cb()
  }
  return stateRef as MutableRefObject<T>
}

export function useRefs<T = Element>() {
  const refs = useRef<MutableRefObject<T>[]>([])

  const setIndexRefs = useCallback(
    (index: number) => (el: unknown) => {
      if (!refs.current[index]) {
        refs.current[index] = createRef() as MutableRefObject<T>
      }
      refs.current[index].current = el as T
    },
    [],
  )

  return [refs.current, setIndexRefs] as const
}

export function useObject<S>(state: S) {
  const forceUpdate = useForceUpdate()

  const stateRef = useRef(state)

  const currentRef = useRef<S>()
  const previousRef = useRef<S>()

  if (!_.isEqual(currentRef.current, state)) {
    previousRef.current = currentRef.current
    currentRef.current = state
    stateRef.current = state
  }

  const setObject = useCallback(
    (newState: S) => {
      stateRef.current = { ...stateRef.current, ...newState }
      forceUpdate()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const getObject = useCallback(() => stateRef.current as S, [])

  return useMemo(
    () => ({ object: stateRef.current, getObject, setObject }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stateRef.current, getObject, setObject],
  )
}
