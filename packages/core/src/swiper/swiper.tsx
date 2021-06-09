import { ITouchEvent, View } from "@tarojs/components"
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
import { useComputed } from "../utils/computed"
import { preventDefault } from "../utils/dom/event"
import { addUnitPx } from "../utils/format/unit"
import { doubleRaf } from "../utils/raf"
import { BoundingClientRect, getBoundingClientRect } from "../utils/rect"
import { usePrevious } from "../utils/state"
import { useTouch } from "../utils/touch"
import SwiperIndicator from "./swiper-indicator"
import SwiperItem from "./swiper-item"
import SwiperContext, { SwiperItemChild } from "./swiper.context"
import { SwiperDirection, SwiperInstance, SwiperItemEvent } from "./swiper.shared"

type SwiperDirectionString = "horizontal" | "vertical"

function range(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

interface SwiperChildren {
  items: ReactNode[]
  indicator: ReactNode
  count: number
}

function useChildren(children: ReactNode): SwiperChildren {
  const __children__: SwiperChildren = {
    items: [],
    indicator: undefined,
    count: 0,
  }
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
      __children__.items.push(
        cloneElement(child, {
          ...element.props,
          key: key ?? i,
          index: index++,
        }),
      )
    }

    if (elementType === SwiperIndicator) {
      __children__.indicator = element
    }
  })

  __children__.count = __children__.items.length
  return __children__
}

export interface SwiperProps {
  className?: string
  activeIndex?: number
  autoplay?: number
  loop?: boolean
  touchable?: boolean
  duration?: number
  width?: number
  height?: number
  direction?: SwiperDirection | SwiperDirectionString
  stopPropagation?: boolean
  children?: ReactNode
  onChange?: (event: SwiperItemEvent) => void
}

const Swiper = forwardRef(function (props: SwiperProps, ref: ForwardedRef<SwiperInstance>) {
  const {
    className,
    activeIndex: activeIndexProp = 0,
    loop = true,
    touchable = true,
    autoplay = 0,
    duration = 500,
    direction = SwiperDirection.Horizontal,
    stopPropagation = true,
    width,
    height,
    onChange,
  } = props

  const { count, indicator, items } = useChildren(props.children)

  const children = useMemo<SwiperItemChild[]>(() => [], [])

  const vertical = direction === SwiperDirection.Vertical

  const rootRef = useRef()
  const customRectRef = useRef<BoundingClientRect>()
  const [, forceSetRootRect] = useState<BoundingClientRect>()
  const [offset, setOffset] = useState<number>(0)
  const swipingRef = useRef(false) // Whether to swiping manually
  const activeIndexPropRef = useRef(0)
  const activeIndexRef = useRef(0)
  const touchStartTimeRef = useRef(0)
  const autoplayTimerRef = useRef<NodeJS.Timeout>()
  const propRect = useMemo(() => ({ width, height }), [width, height])

  const previousActiveIndexProp = usePrevious(activeIndexProp)

  useEffect(() => {
    activeIndexPropRef.current = activeIndexProp
  })

  const touch = useTouch()

  const delta = useComputed(() => (vertical ? touch.deltaY : touch.deltaX), [vertical])

  const correctDirection = useComputed(() => {
    return touch.direction === direction
  }, [direction])

  const size = useComputed(
    () => (vertical ? customRectRef.current?.height : customRectRef.current?.width) ?? 0,
    [vertical],
  )

  const trackSize = useComputed(() => count * size.value, [count, size])

  const activeIndicator = useComputed(() => (activeIndexRef.current + count) % count, [count])

  const minOffset = useComputed(() => {
    if (customRectRef.current) {
      const base = (vertical ? customRectRef.current?.height : customRectRef.current?.width) ?? 0
      return base - size.value * count
    }
    return 0
  }, [size, count, vertical])

  const maxCount = useComputed(() => Math.ceil(Math.abs(minOffset.value) / size.value), [
    minOffset,
    size,
  ])

  const getTargetActiveIndex = useCallback(
    (pace: number) => {
      if (pace) {
        if (loop) {
          return range(activeIndexRef.current + pace, -1, count)
        }
        return range(activeIndexRef.current + pace, 0, maxCount.value)
      }
      return activeIndexRef.current
    },
    [maxCount, count, loop],
  )

  const getTargetOffset = useCallback(
    (targetActive: number, offset = 0) => {
      let currentPosition = targetActive * size.value
      if (!loop) {
        currentPosition = Math.min(currentPosition, -minOffset.value)
      }

      let targetOffset = offset - currentPosition
      if (!loop) {
        targetOffset = range(targetOffset, minOffset.value, 0)
      }
      return targetOffset
    },
    [size, loop, minOffset],
  )
  const trackStyle = useComputed(() => {
    const style: CSSProperties = {
      transitionDuration: `${swipingRef.current ? 0 : duration}ms`,
      transform: `translate${vertical ? "Y" : "X"}(${addUnitPx(offset)})`,
    }
    if (trackSize.value) {
      const mainAxis = vertical ? "height" : "width"
      style[mainAxis] = `${addUnitPx(trackSize.value)}`
    }
    if (size.value) {
      const crossAxis = vertical ? "width" : "height"
      style[crossAxis] = propRect[crossAxis] ? addUnitPx(propRect[crossAxis]) : ""
    }
    return style
  }, [trackSize, size, duration, vertical, offset, propRect])

  const moveTo = useCallback(
    ({ pace = 0, offset = 0, emitChange = false }) => {
      if (count <= 1) {
        return
      }
      const previousActiveIndex = activeIndexPropRef.current

      const targetActiveIndex = getTargetActiveIndex(pace)
      const targetOffset = getTargetOffset(targetActiveIndex, offset)
      if (loop) {
        if (children[0] && targetOffset !== minOffset.value) {
          const outRightBound = targetOffset < minOffset.value
          children[0].setOffset(outRightBound ? trackSize.value : 0)
        }

        if (children[count - 1] && targetOffset !== 0) {
          const outLeftBound = targetOffset > 0
          children[count - 1].setOffset(outLeftBound ? -trackSize.value : 0)
        }
      }
      activeIndexRef.current = targetActiveIndex
      setOffset(targetOffset)

      if (emitChange && previousActiveIndex !== activeIndicator.value) {
        onChange?.({ index: activeIndicator.value })
      }
    },
    [
      count,
      getTargetActiveIndex,
      getTargetOffset,
      loop,
      children,
      minOffset,
      trackSize,
      onChange,
      activeIndicator,
    ],
  )

  const correctPosition = useCallback(() => {
    swipingRef.current = true
    if (activeIndexRef.current <= -1) {
      moveTo({ pace: count })
    } else if (activeIndexRef.current >= count) {
      moveTo({ pace: -count })
    }
  }, [count, moveTo])

  const swipeTo = useCallback(
    (index: number) => {
      correctPosition()
      touch.reset()

      doubleRaf(() => {
        let targetIndex
        if (loop && index === count) {
          targetIndex = activeIndexRef.current === 0 ? 0 : index
        } else {
          targetIndex = index % count
        }

        swipingRef.current = false

        moveTo({
          pace: targetIndex - activeIndexRef.current,
          emitChange: true,
        })
      })
    },
    [correctPosition, count, loop, moveTo, touch],
  )

  const previous = useCallback(() => {
    correctPosition()
    doubleRaf(() => {
      swipingRef.current = false
      moveTo({
        pace: -1,
        emitChange: true,
      })
    })
  }, [correctPosition, moveTo])

  const next = useCallback(() => {
    correctPosition()
    doubleRaf(() => {
      swipingRef.current = false
      moveTo({
        pace: 1,
        emitChange: true,
      })
    })
  }, [correctPosition, moveTo])

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current)
    }
  }, [])

  const startAutoplay = useCallback(() => {
    stopAutoplay()
    if (autoplay > 0 && count > 1) {
      autoplayTimerRef.current = setTimeout(() => {
        next()
        startAutoplay()
      }, +autoplay)
    }
  }, [autoplay, count, next, stopAutoplay])

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

  const onTouchStart = useCallback(
    (event: ITouchEvent) => {
      if (!touchable) {
        return
      }

      touch.start(event)
      touchStartTimeRef.current = Date.now()

      stopAutoplay()
      correctPosition()
    },
    [correctPosition, stopAutoplay, touch, touchable],
  )

  const onTouchMove = useCallback(
    (event: ITouchEvent) => {
      if (!touchable || !swipingRef.current) {
        return
      }

      touch.move(event)
      if (correctDirection.value) {
        preventDefault(event, stopPropagation)
        moveTo({ offset: delta.value })
      }
    },
    [correctDirection, delta, moveTo, stopPropagation, touch, touchable],
  )

  const onTouchEnd = useCallback(() => {
    if (!touchable || !swipingRef.current) {
      return
    }

    const duration = Date.now() - touchStartTimeRef.current
    const speed = delta.value / duration
    const shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta.value) > size.value / 2

    swipingRef.current = false
    if (shouldSwipe && correctDirection.value) {
      const offset = vertical ? touch.offsetY : touch.offsetX

      let pace: number

      if (loop) {
        pace = offset > 0 ? (delta.value > 0 ? -1 : 1) : 0
      } else {
        pace = -Math[delta.value > 0 ? "ceil" : "floor"](delta.value / size.value)
      }

      moveTo({
        pace,
        emitChange: true,
      })
    } else if (delta.value) {
      moveTo({ pace: 0 })
    }
    startAutoplay()
  }, [touchable, delta, size, correctDirection, startAutoplay, vertical, touch, loop, moveTo])

  useEffect(() => {
    const activeIndexProp = activeIndexPropRef.current
    const activeIndexPropIndicator = (activeIndexProp + count) % count

    if (
      activeIndexPropIndicator !== previousActiveIndexProp &&
      activeIndexPropIndicator !== activeIndicator.value
    ) {
      const maxActiveIndex = count - 1
      if (
        previousActiveIndexProp <= activeIndexProp &&
        activeIndexPropIndicator === 0 &&
        activeIndicator.value === maxActiveIndex
      ) {
        next()
      } else if (
        previousActiveIndexProp >= activeIndexProp &&
        activeIndexPropIndicator === maxActiveIndex &&
        activeIndicator.value === 0
      ) {
        previous()
      } else {
        swipeTo(activeIndexPropIndicator)
      }
    }
  }, [activeIndicator, count, next, previous, previousActiveIndexProp, swipeTo])

  useEffect(startAutoplay, [startAutoplay])

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

  useReady(initialize)

  return (
    <View ref={rootRef} className={classNames(prefixClassname("swiper"), className)}>
      <SwiperContext.Provider
        value={{
          direction: direction as SwiperDirection,
          activeIndicator,
          size,
          count,
          children,
        }}
      >
        <View
          className={classNames(prefixClassname("swiper__track"), {
            [prefixClassname("swiper__track--vertical")]: vertical,
          })}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          style={trackStyle.value}
          children={items}
        />
        {indicator}
      </SwiperContext.Provider>
    </View>
  )
})

export default Swiper
