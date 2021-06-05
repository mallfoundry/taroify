import { View } from "@tarojs/components"
import { offWindowResize, onWindowResize, useReady } from "@tarojs/taro"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  cloneElement,
  CSSProperties,
  ForwardedRef,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import { doubleRaf } from "../utils/raf"
import { BoundingClientRect, getBoundingClientRect } from "../utils/rect"
import SwiperItem from "./swiper-item"
import SwiperContext, { SwiperItemChild } from "./swiper.context"
import { SwiperDirection, SwiperInstance, SwiperItemEvent } from "./swiper.shared"

type SwiperDirectionString = "horizontal" | "vertical"

function range(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

interface SwiperChildren {
  items: ReactNode[]
  count: number
}

function useChildren(children: ReactNode): SwiperChildren {
  const items: ReactNode[] = []
  let index = 0
  Children.forEach(children, (child: ReactNode, i) => {
    // Skip is not Item of Swiper
    if (!isValidElement(child)) {
      return
    }
    const element = child as ReactElement
    const elementType = element.type
    if (elementType === SwiperItem) {
      const { key } = element
      items.push(
        cloneElement(child, {
          ...element.props,
          key: key ?? i,
          index: index++,
        }),
      )
    }
  })
  return {
    items,
    count: items.length,
  }
}

export interface SwiperProps {
  className?: string
  activeIndex?: number
  autoplay?: boolean
  loop?: boolean
  duration?: number
  width?: number
  height?: number
  direction?: SwiperDirection | SwiperDirectionString
  children?: ReactNode
  onChange?: (event: SwiperItemEvent) => void
}

const Swiper = forwardRef(function (props: SwiperProps, ref: ForwardedRef<SwiperInstance>) {
  const {
    className,
    activeIndex: activeIndexProp = 0,
    duration = 500,
    direction = SwiperDirection.Horizontal,
    loop = true,
    width,
    height,
  } = props

  const { count, items } = useChildren(props.children)

  const children = useMemo<SwiperItemChild[]>(() => [], [])

  const vertical = direction === SwiperDirection.Vertical
  const rootRef = useRef()
  const customRectRef = useRef<BoundingClientRect>()
  const [, forceSetRootRect] = useState<BoundingClientRect>()
  const [offset, setOffset] = useState<number>(0)
  const swipingRef = useRef(true)
  const activeIndexRef = useRef(0)
  const propRect = useMemo(() => ({ width, height }), [width, height])

  const computedSize = useCallback(
    () => (vertical ? customRectRef.current?.height : customRectRef.current?.width) ?? 0,
    [vertical],
  )

  const computedTrackSize = useCallback(() => count * computedSize(), [computedSize, count])

  const computedMinOffset = useCallback(() => {
    if (customRectRef.current) {
      const base = (vertical ? customRectRef.current?.height : customRectRef.current?.width) ?? 0
      return base - computedSize() * count
    }
    return 0
  }, [computedSize, count, vertical])

  const computedMaxCount = useCallback(
    () => Math.ceil(Math.abs(computedMinOffset()) / computedSize()),
    [computedMinOffset, computedSize],
  )

  const getTargetActiveIndex = useCallback(
    (pace: number) => {
      if (pace) {
        if (loop) {
          return range(activeIndexRef.current + pace, -1, count)
        }
        return range(activeIndexRef.current + pace, 0, computedMaxCount())
      }
      return activeIndexRef.current
    },
    [computedMaxCount, count, loop],
  )

  const getTargetOffset = useCallback(
    (targetActive: number, offset = 0) => {
      let currentPosition = targetActive * computedSize()
      if (!loop) {
        currentPosition = Math.min(currentPosition, -computedMinOffset())
      }

      let targetOffset = offset - currentPosition
      if (!loop) {
        targetOffset = range(targetOffset, computedMinOffset(), 0)
      }
      return targetOffset
    },
    [computedSize, loop, computedMinOffset],
  )

  const moveTo = useCallback(
    (pace = 0, offset = 0) => {
      if (count <= 1) {
        return
      }
      const targetActiveIndex = getTargetActiveIndex(pace)
      const targetOffset = getTargetOffset(targetActiveIndex, offset)
      const minOffset = computedMinOffset()
      const trackSize = computedTrackSize()
      if (loop) {
        if (children[0] && targetOffset !== minOffset) {
          const outRightBound = targetOffset < minOffset
          children[0].setOffset(outRightBound ? trackSize : 0)
        }

        if (children[count - 1] && targetOffset !== 0) {
          const outLeftBound = targetOffset > 0
          children[count - 1].setOffset(outLeftBound ? -trackSize : 0)
        }
      }
      activeIndexRef.current = targetActiveIndex
      setOffset(targetOffset)
    },
    [
      children,
      computedMinOffset,
      computedTrackSize,
      count,
      getTargetActiveIndex,
      getTargetOffset,
      loop,
    ],
  )

  const swipeTo = useCallback(
    (index: number) => {
      const targetIndex = index % count
      moveTo(targetIndex - activeIndexRef.current)
    },
    [count, moveTo],
  )

  const computedTrackStyle = useCallback(() => {
    const trackSize = computedTrackSize()
    const size = computedSize()
    const style: CSSProperties = {
      transitionDuration: `${swipingRef.current ? 0 : duration}ms`,
      transform: `translate${vertical ? "Y" : "X"}(${addUnitPx(offset)})`,
    }
    if (trackSize) {
      const mainAxis = vertical ? "height" : "width"
      style[mainAxis] = `${addUnitPx(trackSize)}`
    }
    if (size) {
      const crossAxis = vertical ? "width" : "height"
      style[crossAxis] = propRect[crossAxis] ? addUnitPx(propRect[crossAxis]) : ""
    }
    return style
  }, [computedTrackSize, computedSize, duration, vertical, offset, propRect])

  const initialize = useCallback(
    async (activeIndex = activeIndexProp) => {
      if (!rootRef.current) {
        return
      }
      customRectRef.current = await getBoundingClientRect(rootRef)
      if (count) {
        activeIndex = Math.min(count - 1, activeIndex)
      }
      activeIndexRef.current = activeIndex
      swipingRef.current = true
      const targetOffset = getTargetOffset(activeIndex)
      setOffset(targetOffset)
      // Force update render
      if (targetOffset === offset) {
        forceSetRootRect(customRectRef.current)
      }
      children.forEach((item) => item.setOffset(0))
    },
    [activeIndexProp, children, count, getTargetOffset, offset],
  )

  const resize = useCallback(() => initialize(activeIndexRef.current), [initialize])

  const correctPosition = useCallback(() => {
    swipingRef.current = true
    if (activeIndexRef.current <= -1) {
      moveTo(count)
    } else if (activeIndexRef.current >= count) {
      moveTo(-count)
    }
  }, [count, moveTo])

  const previous = useCallback(() => {
    correctPosition()
    doubleRaf(() => {
      swipingRef.current = false
      moveTo(-1)
    })
  }, [correctPosition, moveTo])

  const next = useCallback(() => {
    correctPosition()
    doubleRaf(() => {
      swipingRef.current = false
      moveTo(1)
    })
  }, [correctPosition, moveTo])

  useEffect(() => {
    // swipeTo(activeIndexProp)
  }, [activeIndexProp, swipeTo])

  useReady(initialize)

  useEffect(() => {
    const __resize__ = _.debounce(resize, 100)
    onWindowResize(__resize__)
    return () => offWindowResize(__resize__)
  }, [resize])

  // Forward swiper ref
  useImperativeHandle(ref as Ref<SwiperInstance>, () => ({
    previous,
    next,
  }))

  return (
    <View ref={rootRef} className={classNames(prefixClassname("swiper"), className)}>
      <SwiperContext.Provider
        value={{
          direction: direction as SwiperDirection,
          size: computedSize(),
          children,
        }}
      >
        <View
          className={classNames(prefixClassname("swiper__track"), {
            [prefixClassname("swiper__track--vertical")]: vertical,
          })}
          style={computedTrackStyle()}
          children={items}
        />
      </SwiperContext.Provider>
    </View>
  )
})
export default Swiper
