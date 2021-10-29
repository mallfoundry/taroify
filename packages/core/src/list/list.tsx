import { View } from "@tarojs/components"
import { nextTick, usePageScroll } from "@tarojs/taro"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useCallback, useEffect, useRef } from "react"
import { useMounted } from "../hooks"
import { prefixClassname } from "../styles"
import { getRect } from "../utils/dom/rect"
import { getScrollParent } from "../utils/dom/scroll"

enum ListDirection {
  Up = "up",
  Down = "down",
}

type ListDirectionString = "up" | "down"

export interface ListProps {
  className?: string
  loading?: boolean
  hasMore?: boolean
  direction?: ListDirection | ListDirectionString
  offset?: number
  children?: ReactNode
  onLoad?: () => void
}

function List(props: ListProps) {
  const {
    className,
    loading: loadingProp = false,
    hasMore = true,
    direction = ListDirection.Down,
    offset = 300,
    children,
    onLoad,
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

      if (direction === ListDirection.Up) {
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
    <View ref={rootRef} className={classNames(prefixClassname("list"), className)}>
      {direction === ListDirection.Down ? children : listEdge}
      {direction === ListDirection.Up ? children : listEdge}
    </View>
  )
}

export default List
