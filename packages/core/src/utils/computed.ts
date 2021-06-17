import { DependencyList, useCallback, useMemo } from "react"

export interface ComputedRef<T = any> {
  readonly value: T
}

class GetterRef<T> implements ComputedRef<T> {
  private readonly getter: ComputedGetter<any>

  constructor(getter: ComputedGetter<any>) {
    this.getter = getter
  }

  get value(): T {
    return this.getter()
  }
}

type ComputedGetter<T> = () => T

export function useComputed<T>(
  getter: ComputedGetter<T>,
  deps: DependencyList | undefined = [],
): ComputedRef<T> {
  const __getter__ = useCallback(getter, [getter, ...deps])
  return useMemo(() => {
    return new GetterRef(__getter__)
  }, [__getter__])
}
