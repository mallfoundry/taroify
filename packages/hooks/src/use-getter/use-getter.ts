import * as _ from "lodash"
import { useCallback } from "react"

export default function useGetter<T>(state?: T | (() => T)) {
  if (_.isFunction(state)) {
    return useCallback(state, [state])
  }
  return useCallback(() => state, [state])
}
