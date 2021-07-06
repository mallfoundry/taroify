import { View } from "@tarojs/components"
import { nextTick, usePageScroll, useReady } from "@tarojs/taro"
import * as React from "react"
import { ReactNode, useCallback, useEffect, useRef } from "react"
import { prefixClassname } from "../styles"
import { getScrollParent } from "../utils/dom/scroll"
import { getBoundingClientRect } from "../utils/rect"

// interface ListChildren {
//   content?: ReactNode[]
//   loading?: ReactNode
//   error?: ReactNode
//   finished?: ReactNode
// }
//
// function useListChildren(children?: ReactNode) {
//   const __children__: ListChildren = {
//     content: [],
//   }
//
//   Children.forEach(children, (child: ReactNode) => {
//     if (!isValidElement(child)) {
//       __children__.content?.push(child)
//       return
//     }
//     const element = child as ReactElement
//     const elementType = element.type
//
//     if (elementType === ListLoading) {
//       __children__.loading = element
//     } else if (elementType === ListFinished) {
//       __children__.finished = element
//     } else if (elementType === ListError) {
//       __children__.error = element
//     } else {
//       __children__.content?.push(element)
//     }
//   })
//
//   return __children__
// }

enum ListDirection {
  Up = "up",
  Down = "down",
}

type ListDirectionString = "up" | "down"

export interface ListProps {
  loading?: boolean
  hasMore?: boolean
  noMore?: boolean
  direction?: ListDirection | ListDirectionString
  offset?: number
  children?: ReactNode
  onLoad?: () => void
}

function List(props: ListProps) {
  const {
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
      const scrollParentRect = await getBoundingClientRect(scrollParent)
      if (!scrollParentRect.height) {
        return
      }

      let isReachEdge: boolean
      const edgeRect = await getBoundingClientRect(edgeRef)

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

  useReady(loadCheck)

  usePageScroll(loadCheck)

  useEffect(() => {
    loadingRef.current = loadingProp
    loadCheck()
  }, [loadingProp, hasMore, loadCheck])

  const listEdge = <View ref={edgeRef} className={prefixClassname("list__edge")} />

  return (
    <View ref={rootRef} className={prefixClassname("list")}>
      {direction === ListDirection.Down ? children : listEdge}
      {direction === ListDirection.Up ? children : listEdge}
    </View>
  )
}

export default List
