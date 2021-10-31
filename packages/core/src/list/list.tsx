import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import { nextTick, usePageScroll } from "@tarojs/taro"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useCallback, useEffect, useRef } from "react"
import { useMounted } from "../hooks"
import { prefixClassname } from "../styles"
import { getRect } from "../utils/dom/rect"
import { getScrollParent } from "../utils/dom/scroll"

type ListDirection = "up" | "down"

export interface ListProps extends ViewProps {
  className?: string
  loading?: boolean
  hasMore?: boolean
  direction?: ListDirection
  offset?: number
  children?: ReactNode
  onLoad?: () => void
}

function List(props: ListProps) {
  const {
    className,
    loading: loadingProp = false,
    hasMore = true,
    direction = "down",
    offset = 300,
    children,
    onLoad,
    ...restProps
  } = props

  const rootRef = useRef<HTMLElement>()
  const edgeRef = useRef<HTMLElement>()
  const loadingRef = useRef(false)

  const loadCheck = useCallback(() => {
    nextTick(async () => {
      if (loadingRef.current || !hasMore) {
        return
      }
      const scrollParent = await getScrollParent(rootRef.current)
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

      if (isReachEdge) {
        loadingRef.current = true
        onLoad?.()
      }
    })
  }, [direction, hasMore, offset, onLoad])

  useMounted(loadCheck)

  usePageScroll(loadCheck)

  useEffect(() => {
    loadingRef.current = loadingProp
    loadCheck()
  }, [loadingProp, loadCheck])

  const listEdge = <View ref={edgeRef} className={prefixClassname("list__edge")} />

  return (
    <View ref={rootRef} className={classNames(prefixClassname("list"), className)} {...restProps}>
      {direction === "down" ? children : listEdge}
      {direction === "up" ? children : listEdge}
    </View>
  )
}

export default List
