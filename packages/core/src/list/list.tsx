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
import { useToRef } from "../utils/state"
import { ListDirection } from "./list.shared"

export interface ListProps extends ViewProps {
  loading?: boolean
  hasMore?: boolean
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
  const loadingRef = useToRef(loadingProp)
  const hasMoreRef = useToRef(hasMoreProp)

  const loadCheck = useCallback(() => {
    nextTick(async () => {
      if (loadingRef.current || !hasMoreRef.current) {
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
      if (isReachEdge && !loadingRef.current) {
        loadingRef.current = true
        onLoad?.()
      }
    })
  }, [direction, hasMoreRef, loadingRef, offset, onLoad])

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
