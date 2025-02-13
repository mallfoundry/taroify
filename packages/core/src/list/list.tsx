import { useGetter, useToRef } from "@taroify/hooks"
import { View, ScrollView, ScrollViewProps, BaseEventOrig } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { forwardRef, ForwardedRef, useImperativeHandle } from "react"
import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react"
import { nextTick, usePageScroll } from "@tarojs/taro"
import { useMemoizedFn, useDidEffect } from "../hooks"
import { prefixClassname } from "../styles"
import { getRect } from "../utils/dom/rect"
import { getScrollParent } from "../utils/dom/scroll"
import { raf } from "../utils/raf"
import { debounce } from "../utils/lodash-polyfill"
import { ListDirection, ListInstance } from "./list.shared"
import PullRefreshContext from "../pull-refresh/pull-refresh.context"

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
  loading?: boolean
  hasMore?: boolean
  direction?: ListDirection
  offset?: number
  immediateCheck?: boolean
  disabled?: boolean
  fixedHeight?: boolean
  children?: ReactNode
  onLoad?(): void
  onScroll?(e: BaseEventOrig<ScrollViewProps.onScrollDetail>): void
}

function List(props: ListProps, ref: ForwardedRef<ListInstance>) {
  const {
    className,
    loading: loadingProp = false,
    hasMore = true,
    direction = "down",
    offset = 100,
    immediateCheck: immediateCheckProp = true,
    fixedHeight = false,
    disabled = false,
    children,
    onLoad,
    onScroll: onScrollProp,
    ...restProps
  } = props
  const rootRef = useRef<HTMLElement>()
  const scrollRef = useRef<HTMLElement>()
  const edgeRef = useRef<HTMLElement>()
  const onLoadRef = useToRef(onLoad)
  const immediateCheck = useToRef(immediateCheckProp)
  const { isLoading, setLoading } = useAssignLoading(loadingProp)
  const { 
    onTouchStart: onPullRefreshTouchStart, 
    onTouchEnd: onPullRefreshTouchEnd, 
    onTouchMove: onPullRefreshTouchMove 
  } = React.useContext(PullRefreshContext)

  const check = useMemoizedFn(debounce(() => {
    raf(async () => {
      if (isLoading() || !hasMore || disabled) {
        return
      }
      const scrollParentRect = await getRect(scrollRef)
      if (!scrollParentRect?.height) {
        return
      }

      let isReachEdge: boolean
      const edgeRect = await getRect(edgeRef)
      if (direction === "up") {
        isReachEdge = scrollParentRect.top - edgeRect.top <= offset
      } else {
        isReachEdge = edgeRect.bottom - scrollParentRect.bottom <= offset
      }

      if (isLoading() || !hasMore || disabled) {
        return
      }
      if (isReachEdge) {
        setLoading(true)
        onLoadRef.current?.()
      }
    })
  }, 50))

  useImperativeHandle(ref, () => ({
    check
  }))

  usePageScroll(() => {
    if (!fixedHeight) {
      check()
    }
  })

  const onScroll = (e) => {
    onScrollProp?.(e)
    if (fixedHeight) {
      check()
    }
  }

  const onTouchStart = (e) => {
    if (fixedHeight) {
      onPullRefreshTouchStart?.(e)
    }
  }

  const onTouchMove = (e) => {
    if (fixedHeight) {
      onPullRefreshTouchMove?.(e)
    }
  }

  const onTouchEnd = (e) => {
    if (fixedHeight) {
      onPullRefreshTouchEnd?.(e)
    }
  }

  useDidEffect(() => {
    check()
  }, [loadingProp, hasMore, check])

  useEffect(() => {
    nextTick(async () => {
      if (fixedHeight) {
        scrollRef.current = rootRef.current
      } else {
        //
        scrollRef.current = await getScrollParent(rootRef)
      }
      if (immediateCheck.current) {
        check()
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fixedHeight])

  const Wrapper = useMemo(() => fixedHeight ? ScrollView : View, [fixedHeight])

  const listEdge = useMemo(
    () => <View ref={edgeRef} className={prefixClassname("list__edge")} />,
    [],
  )

  return (
    <Wrapper 
      ref={rootRef}
      scrollY={fixedHeight}
      className={classNames(prefixClassname("list"), className)} 
      {...restProps}
      onScroll={onScroll}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {direction === "down" ? children : listEdge}
      {direction === "up" ? children : listEdge}
    </Wrapper>
  )
}

export default forwardRef<ListInstance, ListProps>(List)
