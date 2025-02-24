import * as _ from "lodash"
import { useCallback, useMemo, useRef } from "react"
import useForceUpdate from "../use-force-update"
import useToRef from "../use-to-ref"

interface UseUncontrolledOptions<S> {
  defaultValue?: S
  value?: S

  onChange?: (...args: any[]) => void
}

export default function useUncontrolled<S>(options: UseUncontrolledOptions<S> = {}) {
  const { defaultValue, value: valueProp, onChange } = options
  const forceUpdate = useForceUpdate()
  const valueRef = useToRef(valueProp)
  const stateRef = useRef(defaultValue ?? valueRef.current)

  if (valueRef.current !== undefined) {
    stateRef.current = valueRef.current
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const setValue = useCallback(
    (newValue: S, emitChange?: (aValue: S) => void) => {
      // When state was changed,
      // does set value and trigger onChange event
      const changed = stateRef.current !== newValue
      if (changed) {
        if (_.isUndefined(valueRef.current)) {
          stateRef.current = newValue
          forceUpdate()
        }
        ;(emitChange ?? onChange)?.(newValue)
      }
    },
    [onChange],
  )

  const getValue = useCallback(() => stateRef.current as S, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  return useMemo(
    () => ({
      value: stateRef.current,
      getValue,
      setValue,
    }),
    [stateRef.current, getValue, setValue],
  )
}
