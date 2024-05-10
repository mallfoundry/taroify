import { ITouchEvent, ScrollView, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import { usePageScroll, getEnv } from "@tarojs/taro"
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
  useEffect,
  forwardRef,
  useImperativeHandle,
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
  inner?: boolean
  delay?: number
  showSidebar?: boolean
  children?: ReactNode
  onChange?: (current: number, anchor: number | string) => void
}

const IndexList = forwardRef<any, IndexListProps>((props, ref) => {
  const {
    className,
    sticky = true,
    stickyOffsetTop = 0,
    inner = false,
    delay: delayProp,
    showSidebar = true,
    children: childrenProp,
    onChange,
    ...restProps
  } = props
  const delay = inner ? (_.isNumber(delayProp) ? delayProp : 300) : 0

  const TagElement = inner ? ScrollView : View

  const { anchorProps, anchorRefs, children } = useIndexBarChildren(childrenProp)

  const scrollTopRef = useRef(0)

  const listRef = useRef<HTMLElement>()

  const sidebarRef = useRef<HTMLElement>()

  const listRectRef = useRef<Rect>(makeRect(0, 0))

  const sidebarRectRef = useRef<Rect>(makeRect(0, 0))

  const anchorRectsRef = useRef<Rect[]>([])

  const anchorRectsCacheRef = useRef<Rect[]>([])

  const firstAnchorTop = useRef(0)

  const scrolling = useRef(false)

  const [activeAnchor, setActiveAnchor] = useState<{
    index?: number | string
    arrayedIndex?: number
  }>({})
  const [scrollTop, setScrollTop] = useState<number>()

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

      if (reachTop + firstAnchorTop.current >= anchorRects[i].top) {
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
      if (scrollToAnchorIndexRef.current !== arrayedIndex) {
        scrollToAnchorIndexRef.current = arrayedIndex
        onChange?.(arrayedIndex, anchorProps[arrayedIndex].index)
      }
    } else {
      setActiveAnchor({})
    }
  }, [anchorProps, getActiveAnchor])

  const scrollToAnchor = useCallback(
    (anchorArrayedIndex: number) => {
      if (anchorArrayedIndex < 0 || scrollToAnchorIndexRef.current === anchorArrayedIndex) {
        return
      }

      if (inner) {
        setScrollTop(anchorRectsCacheRef.current[anchorArrayedIndex].top - firstAnchorTop.current)
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

  const onTouchStart = useCallback(() => {
    scrolling.current = true
  }, [scrolling])

  const onTouchMove = useCallback(
    (event) => {
      preventDefault(event)
      scrollToEvent(event)
    },
    [scrollToEvent],
  )

  const onTouchStop = useCallback(() => (scrollToAnchorIndexRef.current = undefined), [])

  const getRectAll = (init?: boolean) => {
    setTimeout(
      () => {
        Promise.all([getListRect(), getSidebarRect(), getAnchorRects()])
          .then((rects) => {
            const [listRect, sidebarRect, anchorRects] = rects
            listRectRef.current = listRect
            sidebarRectRef.current = sidebarRect
            anchorRectsRef.current = anchorRects
            if (init && inner) {
              anchorRectsCacheRef.current = anchorRects
              firstAnchorTop.current = anchorRects[0].top || 0
            }
          })
          .then(onScroll)
      },
      _.isNumber(delay) ? delay + 1 : 0,
    )
  }

  useEffect(() => {
    getRectAll(true)
  }, [])

  usePageScroll(({ scrollTop }) => {
    if (inner) {
      return
    }
    scrollTopRef.current = scrollTop
    getRectAll()
  })

  const onPageScroll = (e) => {
    const { scrollTop } = e.detail
    scrollTopRef.current = scrollTop
    getRectAll()
    if (scrolling.current) {
      return
    }
    getEnv() === "WEB" && setScrollTop(scrollTop)
  }

  const sidebarIndexes = useMemo(
    () =>
      _.map(anchorProps, (anchorProp) => (
        <IndexListIndex key={anchorProp.index} index={anchorProp.index} />
      )),
    [anchorProps],
  )

  useImperativeHandle(ref, () => {
    return {
      scrollTo(index) {
        scrollToAnchor(index)
      },
    }
  })

  return (
    <IndexListContext.Provider
      value={{
        sticky,
        stickyOffsetTop,
        inner,
        activeIndex: activeAnchor?.index ?? -1,
        activeArrayedIndex: activeAnchor?.arrayedIndex ?? -1,
        getListRect: () => listRectRef.current,
        getAnchorRects: () => anchorRectsRef.current,
        getFirstAnchorTop: () => firstAnchorTop.current,
      }}
    >
      <View
        className={classNames(
          prefixClassname("index-list"),
          {
            inner: inner,
          },
          className,
        )}
      >
        {showSidebar && (
          <IndexListSidebar
            ref={sidebarRef}
            inner={inner}
            onClick={onSidebarClick}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchCancel={onTouchStop}
            onTouchEnd={onTouchStop}
          >
            {sidebarIndexes}
          </IndexListSidebar>
        )}
        <TagElement
          scrollY
          ref={listRef}
          className={classNames({
            [prefixClassname("index-list_scroll")]: inner,
          })}
          scrollTop={scrollTop}
          scrollWithAnimation
          scrollAnchoring
          onScroll={onPageScroll}
          onTouchStart={() => {
            scrolling.current = false
          }}
          {...restProps}
        >
          {children}
        </TagElement>
      </View>
    </IndexListContext.Provider>
  )
})

export default IndexList
