import { DependencyList, EffectCallback, useEffect, useRef } from "react"

function useFieldValueEffect(effect: EffectCallback, deps?: DependencyList) {
  const counterRef = useRef(0)

  useEffect(
    () => {
      if (counterRef.current !== 0) {
        effect?.()
      }
      if (counterRef.current === 0) {
        counterRef.current++
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  )
}

export default useFieldValueEffect
