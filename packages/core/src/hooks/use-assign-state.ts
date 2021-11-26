import { Dispatch, useCallback, useRef } from "react"

function useAssignState<S>(initialState: S | (() => S)): [S, Dispatch<S>]
function useAssignState<S = undefined>(): [S | undefined, Dispatch<S | undefined>]
function useAssignState<S = undefined>(initialState?: S): [S | undefined, (newState: S) => S] {
  const stateRef = useRef(initialState)
  const setState = useCallback((newState: S) => (stateRef.current = newState), [])
  return [stateRef.current, setState]
}

export default useAssignState
