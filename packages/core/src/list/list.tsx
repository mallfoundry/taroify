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

  if (valueRef.current !== value) {
    valueRef.current = value
  }

  const isLoading = useCallback(() => valueRef.current, [])

  const setLoading = useCallback((newValue: T) => (valueRef.current = newValue), [])

  return useMemo(
    () => ({
      isLoading,
      setLoading,
    }),
    [isLoading, setLoading],
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

  onLoading?(loading: true): void
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
    onLoading,
    ...restProps
  } = props

  const rootRef = useRef<HTMLElement>()
  const edgeRef = useRef<HTMLElement>()

  const onLoadingRef = useToRef(onLoading)
  const onLoadRef = useToRef(onLoad)

  const { isLoading, setLoading } = useAssignLoading(loadingProp)
  const isHasMore = useGetter(hasMoreProp)

  const loadCheck = useCallback(
    () =>
      nextTick(async () => {
        if (isLoading() || !isHasMore()) {
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
        if (isReachEdge && !isLoading()) {
          setLoading(true)
          onLoadingRef.current?.(true)
          onLoadRef.current?.()
        }
      }),
    [direction, isHasMore, isLoading, offset, onLoadRef, onLoadingRef, setLoading],
  )

  useMounted(loadCheck)

  useEffect(loadCheck, [isLoading(), isHasMore(), loadCheck, scrollTop, children])

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
