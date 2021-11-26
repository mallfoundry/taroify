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

export function usePreviousRef<T = any>(value: T): MutableRefObject<T> {
  const previousRef = useRef<T>(value)
  useEffect(() => {
    previousRef.current = value
  })
  return previousRef
}

export type ShouldUpdateFunction<T> = (prev: T | undefined, next: T) => boolean

const defaultShouldUpdate = <T>(a?: T, b?: T) => a !== b

export function usePrevious<T>(
  state: T,
  shouldUpdate: ShouldUpdateFunction<T> = defaultShouldUpdate,
): T | undefined {
  const previousRef = useRef<T>()
  const currentRef = useRef<T>()

  if (shouldUpdate(currentRef.current, state)) {
    previousRef.current = currentRef.current
    currentRef.current = state
  }

  return previousRef.current
}

type UseRenderedCallback<T> = () => T

export function useRendered<T = any>(cb: UseRenderedCallback<T>): T {
  return cb?.()
}

export function useRenderedRef<T = any>(cb: UseRenderedCallback<T>): MutableRefObject<T> {
  const stateRef = useRef<T>()
  if (cb) {
    stateRef.current = cb()
  }
  return stateRef as MutableRefObject<T>
}

export function useToRef<T = any>(value: T): MutableRefObject<T> {
  const stateRef = useRef<T>()
  stateRef.current = value
  return stateRef as MutableRefObject<T>
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
