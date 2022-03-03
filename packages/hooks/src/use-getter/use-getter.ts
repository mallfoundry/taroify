import * as _ from "lodash"
import { useMemo } from "react"

export default function useGetter<T>(state?: T | (() => T)) {
  return useMemo(() => {
    if (_.isFunction(state)) {
      return state
    }
    return () => state
  }, [state])
}
