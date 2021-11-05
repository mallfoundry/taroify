import * as _ from "lodash"
import {
  createRef,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

export function usePrevious<T = any>(value: T): T {
  const previousRef = useRef<T>(value)
  useEffect(() => {
    previousRef.current = value
  })
  return previousRef.current
}

export function useToRef<T = any>(value: T): MutableRefObject<T> {
  const stateRef = useRef<T>(value)
  stateRef.current = value
  return stateRef
}

export function useRefs<T = Element>() {
  const refs = useRef<MutableRefObject<T>[]>([])

  const setIndexRefs = useCallback(
    (index: number) => (el: unknown) => {
      if (!refs.current[index]) {
        refs.current[index] = createRef() as MutableRefObject<T>
      }
      refs.current[index].current = el as T
    },
    [],
  )

  return [refs.current, setIndexRefs] as const
}

export function useObject<S>(props: S): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState<S>(props)
  const stateRef = useToRef(state)
  const deps = useMemo(() => _.values(props), [props])

  useEffect(() => {
    setState(props)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  function dispatchState(newState: SetStateAction<S>) {
    setState({ ...stateRef.current, ...newState })
  }

  return [state as S, dispatchState]
}
