/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useMemo, useEffect, useCallback } from "react"
import type { DependencyList, EffectCallback } from "react"
import { isEqual } from "lodash"

function createDeepCompare(deps: DependencyList) {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<number>(0);

  if (deps === undefined || !isEqual(deps, ref.current)) {
    ref.current = deps;
    signalRef.current += 1;
  }
  return [signalRef.current]
}

export function useDeepCompareEffect(effect: EffectCallback, deps: DependencyList) {
  return useEffect(effect, createDeepCompare(deps))
}
export function useDeepCompareMemo<T>(factory: () => T, deps: DependencyList): T {
  return useMemo(factory, createDeepCompare(deps))
}
export function useDeepCompareCallback<T extends Function>(callback: T, deps: DependencyList): T {
  return useCallback(callback, createDeepCompare(deps))
}
