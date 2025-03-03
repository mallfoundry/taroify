import { nextTick } from "@tarojs/taro"
import * as _ from "lodash"
import { type DependencyList, type EffectCallback, useEffect, useRef } from "react"

function useRenderedEffect(effect: EffectCallback, deps?: DependencyList) {
  const destructorRef = useRef<() => void>()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    nextTick(() => {
      const destructor = effect?.()
      if (_.isFunction(destructor)) {
        destructorRef.current = destructor
      }
    })

    return destructorRef.current
  }, deps)
}

export default useRenderedEffect
