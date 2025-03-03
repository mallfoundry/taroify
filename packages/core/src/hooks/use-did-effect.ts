import { type DependencyList, type EffectCallback, useEffect, useRef } from "react"

function useDidEffect(effect: EffectCallback, deps?: DependencyList) {
  const mounted = useRef(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (mounted.current) {
      effect?.()
    } else {
      mounted.current = true
    }
  }, deps)
}

export default useDidEffect
