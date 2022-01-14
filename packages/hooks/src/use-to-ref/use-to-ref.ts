import { MutableRefObject, useRef } from "react"

export default function useToRef<T = any>(value: T): MutableRefObject<T> {
  const stateRef = useRef<T>()
  stateRef.current = value
  return stateRef as MutableRefObject<T>
}
