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
  //
  const valueRef = useToRef(valueProp)
  const stateRef = useRef(defaultValue ?? valueRef.current)

  if (valueRef.current !== undefined) {
    stateRef.current = valueRef.current
  }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onChange],
  )

  const getValue = useCallback(() => stateRef.current as S, [])

  return useMemo(
    () => ({
      value: stateRef.current,
      getValue,
      setValue,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stateRef.current, getValue, setValue],
  )
}
