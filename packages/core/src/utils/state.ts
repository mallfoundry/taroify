import { createRef, MutableRefObject, useCallback, useEffect, useRef } from "react"

export function usePrevious<T = any>(value: T): T {
  const previousRef = useRef<T>(value)
  useEffect(() => {
    previousRef.current = value
  })
  return previousRef.current
}

export function useToRef<T = any>(value: T): MutableRefObject<T> {
  const stateRef = useRef<T>(value)
  useEffect(() => {
    stateRef.current = value
  }, [value])
  return stateRef
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
