import { ITouchEvent, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import { usePageScroll } from "@tarojs/taro"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  cloneElement,
  createRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"
import { isFragment } from "react-is"
import { prefixClassname } from "../styles"
import { getClientCoordinates, preventDefault } from "../utils/dom/event"
import { getRect, getRects, makeRect, Rect } from "../utils/dom/rect"
import IndexListAnchor, { IndexListAnchorInstance, IndexListAnchorProps } from "./index-list-anchor"
import IndexListIndex from "./index-list-index"
import IndexListSidebar from "./index-list-sidebar"
import IndexListContext from "./index-list.context"

interface IndexBarChildren {
  children: ReactNode[]
  anchorRefs: RefObject<IndexListAnchorInstance>[]
  anchorProps: IndexListAnchorProps[]
}

function childrenIndexBar(
  children: ReactNode,
  __children__: IndexBarChildren,
  parentIndex?: React.Key,
) {
  Children.forEach(children, (child: ReactNode, index: number) => {
    if (!isValidElement(child)) {
      return
    }

    const element = child as ReactElement
    const elementType = element.type
    const { key, props } = element
    const { children: childrenProp } = props

    if (isFragment(element)) {
      childrenIndexBar(childrenProp, __children__, key ?? index)
      return
    }
    if (elementType === IndexListAnchor) {
      const { index: indexProp } = props
      const anchorRef = createRef<IndexListAnchorInstance>()
      const { length: arrayedIndex } = __children__.anchorRefs
      __children__.anchorRefs.push(anchorRef)
      __children__.anchorProps.push(props)
      __children__.children?.push(
        cloneElement(element, {
          arrayedIndex,
          key: indexProp,
          ref: anchorRef,
        }),
      )
    } else {
      __children__.children?.push(
        cloneElement(element, {
          key: key ?? `${parentIndex}-${index}`,
        }),
      )
    }
  })
}

function useIndexBarChildren(children?: ReactNode): IndexBarChildren {
  return useMemo(() => {
    const __children__: IndexBarChildren = {
      children: [],
      anchorRefs: [],
      anchorProps: [],
    }
    childrenIndexBar(children, __children__)
    return __children__
  }, [children])
}

export interface IndexListProps extends ViewProps {
  sticky?: boolean
  stickyOffsetTop?: number | string
  children?: ReactNode
}

function IndexList(props: IndexListProps) {
  const {
    className,
    sticky = true,
    stickyOffsetTop = 0,
    children: childrenProp,
    ...restProps
  } = props
  const { anchorProps, anchorRefs, children } = useIndexBarChildren(childrenProp)

  const scrollTopRef = useRef(0)

  const listRef = useRef<HTMLElement>()

  const sidebarRef = useRef<HTMLElement>()

  const listRectRef = useRef<Rect>(makeRect(0, 0))

  const sidebarRectRef = useRef<Rect>(makeRect(0, 0))

  const anchorRectsRef = useRef<Rect[]>([])

  const [activeAnchor, setActiveAnchor] = useState<{
    index?: number | string
    arrayedIndex?: number
  }>({})

  const getListRect = useCallback(
    () =>
      getRect(listRef).then((rect) => ({
        ...rect,
        top: rect.top + scrollTopRef.current,
      })),
    [],
  )

  const getSidebarRect = useCallback(() => getRect(sidebarRef), [])

  const getAnchorRects = useCallback(
    () => getRects(listRef, ` .${prefixClassname("index-list__anchor-wrapper")}`),
    [],
  )

  const scrollToAnchorIndexRef = useRef<number | string>()

  const getActiveAnchor = useCallback(() => {
    const { current: anchorRects } = anchorRectsRef
    for (let i = anchorRefs.length - 1; i >= 0; i--) {
      const prevHeight = i > 0 ? anchorRects[i - 1].height : 0
      const reachTop = sticky ? prevHeight : 0

      if (reachTop >= anchorRects[i].top) {
        return i
      }
    }
    return -1
  }, [anchorRefs.length, sticky])

  const onScroll = useCallback(async () => {
    const arrayedIndex = getActiveAnchor()
    if (arrayedIndex >= 0) {
      setActiveAnchor({
        arrayedIndex,
        index: anchorProps[arrayedIndex].index,
      })
    } else {
      setActiveAnchor({})
    }
  }, [anchorProps, getActiveAnchor])

  const scrollToAnchor = useCallback(
    (anchorArrayedIndex: number) => {
      if (anchorArrayedIndex < 0 || scrollToAnchorIndexRef.current === anchorArrayedIndex) {
        return
      }

      scrollToAnchorIndexRef.current = anchorArrayedIndex
      const { current: matchInstance } = anchorRefs[anchorArrayedIndex]
      matchInstance?.scrollIntoView(scrollTopRef.current)
    },
    [anchorRefs],
  )

  const getAnchorArrayedIndex = useCallback(
    (event: ITouchEvent) => {
      const { current: sidebarRect } = sidebarRectRef
      const touch = getClientCoordinates(event)
      const sidebarLength = _.size(anchorRefs)
      const itemHeight = sidebarRect.height / sidebarLength
      let index = Math.floor((touch.clientY - sidebarRect.top) / itemHeight)
      if (index < 0) {
        index = 0
      } else if (index > sidebarLength - 1) {
        index = sidebarLength - 1
      }
      return index
    },
    [anchorRefs],
  )

  const scrollToEvent = useCallback(
    (event: ITouchEvent) => {
      const arrayedIndex = getAnchorArrayedIndex(event)
      scrollToAnchor(arrayedIndex)
    },
    [getAnchorArrayedIndex, scrollToAnchor],
  )

  const onSidebarClick = useCallback((event: ITouchEvent) => scrollToEvent(event), [scrollToEvent])

  const onTouchMove = useCallback(
    (event: ITouchEvent) => {
      preventDefault(event)
      scrollToEvent(event)
    },
    [scrollToEvent],
  )

  const onTouchStop = useCallback(() => (scrollToAnchorIndexRef.current = undefined), [])

  usePageScroll(({ scrollTop }) => {
    scrollTopRef.current = scrollTop
    setTimeout(() => {
      Promise.all([getListRect(), getSidebarRect(), getAnchorRects()])
        .then((rects) => {
          const [listRect, sidebarRect, anchorRects] = rects
          listRectRef.current = listRect
          sidebarRectRef.current = sidebarRect
          anchorRectsRef.current = anchorRects
        })
        .then(onScroll)
    }, 0)
  })

  const sidebarIndexes = useMemo(
    () =>
      _.map(anchorProps, (anchorProp) => (
        <IndexListIndex key={anchorProp.index} index={anchorProp.index} />
      )),
    [anchorProps],
  )

  return (
    <IndexListContext.Provider
      value={{
        sticky,
        stickyOffsetTop,
        activeIndex: activeAnchor?.index ?? -1,
        activeArrayedIndex: activeAnchor?.arrayedIndex ?? -1,
        getListRect: () => listRectRef.current,
        getAnchorRects: () => anchorRectsRef.current,
      }}
    >
      <View
        ref={listRef}
        className={classNames(prefixClassname("index-list"), className)}
        {...restProps}
      >
        <IndexListSidebar
          ref={sidebarRef}
          onClick={onSidebarClick}
          onTouchMove={onTouchMove}
          onTouchCancel={onTouchStop}
          onTouchEnd={onTouchStop}
        >
          {sidebarIndexes}
        </IndexListSidebar>
        {children}
      </View>
    </IndexListContext.Provider>
  )
}

export default IndexList
