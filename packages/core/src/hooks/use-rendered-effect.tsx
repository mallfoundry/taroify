import { nextTick } from "@tarojs/taro"
import * as _ from "lodash"
import { DependencyList, EffectCallback, useEffect, useRef } from "react"

function useRenderedEffect(effect: EffectCallback, deps?: DependencyList) {
  const destructorRef = useRef<() => void>()

  useEffect(
    () => {
      nextTick(() => {
        const destructor = effect?.()
        if (_.isFunction(destructor)) {
          destructorRef.current = destructor
        }
      })

      return destructorRef.current
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  )
}

export default useRenderedEffect
