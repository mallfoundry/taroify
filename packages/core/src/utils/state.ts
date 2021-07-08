import { MutableRefObject, useEffect, useRef } from "react"

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
