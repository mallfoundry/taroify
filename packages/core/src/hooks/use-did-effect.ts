import { DependencyList, EffectCallback, useEffect, useRef } from "react"

function useDidEffect(effect: EffectCallback, deps?: DependencyList) {
  const mounted = useRef(false)

  useEffect(
    () => {
      if (mounted.current) {
        effect?.()
      } else {
        mounted.current = true
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  )
}

export default useDidEffect
