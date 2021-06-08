import { useEffect, useRef } from "react"

export function usePrevious<T = any>(value: T): T {
  const previousRef = useRef<T>(value)
  useEffect(() => {
    previousRef.current = value
  })
  return previousRef.current
}
