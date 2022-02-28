import { useGetter, useToRef } from "@taroify/hooks"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import { nextTick } from "@tarojs/taro"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react"
import { useMounted } from "../hooks"
import { prefixClassname } from "../styles"
import { getRect } from "../utils/dom/rect"
import { getScrollParent } from "../utils/dom/scroll"
import { ListDirection } from "./list.shared"

function useAssignLoading<T = any>(state?: T | (() => T)) {
  const getState = useGetter(state)
  const value = getState()
  const valueRef = useRef<T>()
  const previousRef = useRef<T>()

  if (value !== previousRef.current) {
    valueRef.current = value
    previousRef.current = value
  }

  const getLoading = useCallback(() => valueRef.current, [])

  const setLoading = useCallback((newValue: T) => (valueRef.current = newValue), [])

  return useMemo(
    () => ({
      getLoading,
      setLoading,
    }),
    [getLoading, setLoading],
  )
}

export interface ListProps extends ViewProps {
  loading?: boolean | (() => boolean)
  hasMore?: boolean | (() => boolean)
  direction?: ListDirection
  offset?: number
  children?: ReactNode

  scrollTop?: number

  onLoad?(): void
}

function List(props: ListProps) {
  const {
    className,
    loading: loadingProp = false,
    hasMore: hasMoreProp = true,
    direction = "down",
    offset = 300,
    children,
    scrollTop,
    onLoad,
    ...restProps
  } = props

  const rootRef = useRef<HTMLElement>()
  const edgeRef = useRef<HTMLElement>()

  const { getLoading, setLoading } = useAssignLoading(loadingProp)
  const hasMoreRef = useToRef(hasMoreProp)

  const loadCheck = useCallback(
    () =>
      nextTick(async () => {
        const loading = getLoading()
        const hasMore = hasMoreRef.current
        if (loading || !hasMore) {
          return
        }

        const scrollParent = await getScrollParent(rootRef)
        const scrollParentRect = await getRect(scrollParent)
        if (!scrollParentRect.height) {
          return
        }

        let isReachEdge: boolean
        const edgeRect = await getRect(edgeRef)
        if (direction === "up") {
          isReachEdge = scrollParentRect.top - edgeRect.top <= offset
        } else {
          isReachEdge = edgeRect.bottom - scrollParentRect.bottom <= offset
        }
        if (isReachEdge && !loading) {
          setLoading(true)
          onLoad?.()
        }
      }),
    [direction, getLoading, hasMoreRef, offset, onLoad, setLoading],
  )

  useMounted(loadCheck)

  useEffect(loadCheck, [loadingProp, hasMoreProp, loadCheck, scrollTop, children])

  const listEdge = useMemo(
    () => <View ref={edgeRef} className={prefixClassname("list__edge")} />,
    [],
  )

  return (
    <View ref={rootRef} className={classNames(prefixClassname("list"), className)} {...restProps}>
      {direction === "down" ? children : listEdge}
      {direction === "up" ? children : listEdge}
    </View>
  )
}

export default List
