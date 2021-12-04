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
import { useUpdate } from "../hooks"

export function usePreviousRef<T = any>(value: T): MutableRefObject<T> {
  const previousRef = useRef<T>(value)
  useEffect(() => {
    previousRef.current = value
  })
  return previousRef
}

export function usePrevious<T>(state: T): T | undefined {
  return usePreviousRef(state).current
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

interface UseValueOptions<S> {
  defaultValue?: S

  onChange?(value: S): void
}

export function useValue<S>(
  propValue: S,
  { defaultValue, onChange }: UseValueOptions<S> = {},
): [S, Dispatch<S>] {
  const update = useUpdate()
  const valueRef = useRef<S>(defaultValue ?? propValue)

  if (propValue !== undefined) {
    valueRef.current = propValue
  }

  const dispatchValue = useCallback(
    (newValue: S, emitChange?: (aValue: S) => void) => {
      if (_.isUndefined(propValue)) {
        valueRef.current = newValue
        update()
      }
      ;(emitChange ?? onChange)?.(newValue)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onChange, propValue],
  )

  return [valueRef.current, dispatchValue]
}
