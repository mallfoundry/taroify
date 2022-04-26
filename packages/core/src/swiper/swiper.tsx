import { useForceUpdate, useUncontrolled } from "@taroify/hooks"
import { ITouchEvent, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import { nextTick } from "@tarojs/taro"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useMounted, useWindowResize } from "../hooks"
import { prefixClassname } from "../styles"
import { getComputedStyle } from "../utils/dom/computed-style"
import { preventDefault } from "../utils/dom/event"
import { getRect, makeRect, Rect } from "../utils/dom/rect"
import { addUnitPx, unitToPx } from "../utils/format/unit"
import { doubleRaf } from "../utils/raf"
import { useRendered, useRenderedRef, useToRef } from "../utils/state"
import { useTouch } from "../utils/touch"
import SwiperIndicator from "./swiper-indicator"
import SwiperItem from "./swiper-item"
import SwiperContext, { SwiperItemInstance } from "./swiper.context"
import { SwiperDirection } from "./swiper.shared"

interface SwiperChildren {
  items: ReactNode[]
  indicator: ReactNode
  count: number
}

function useSwiperChildren(children: ReactNode): SwiperChildren {
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
    if (elementType === SwiperIndicator) {
      __children__.indicator = element
    } else if (elementType === SwiperItem) {
      const { key } = element
      __children__.items.push(
        cloneElement(element, {
          ...element.props,
          key: key ?? i,
          __dataIndex__: index++,
        }),
      )
    } else {
      __children__.items.push(element)
    }
  })

  __children__.count = __children__.items.length
  return __children__
}

function getIndicatorValue(value: number, count: number) {
  return (value + count) % count
}

export interface SwiperProps extends ViewProps {
  className?: string
  style?: CSSProperties
  defaultValue?: number
  value?: number
  lazyRender?: boolean
  width?: number
  height?: number
  autoplay?: number
  loop?: boolean
  touchable?: boolean
  duration?: number
  direction?: SwiperDirection
  stopPropagation?: boolean
  children?: ReactNode

  onChange?(value: number): void
}

function Swiper(props: SwiperProps) {
  const {
    className,
    defaultValue,
    value: valueProp,
    lazyRender,
    loop = true,
    touchable = true,
    autoplay = 0,
    duration = 500,
    width,
    height,
    direction = "horizontal",
    stopPropagation = true,
    children: childrenProp,
    onChange: onChangeProp,
    ...restProps
  } = props

  const { value = 0, setValue } = useUncontrolled({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  })

  const valueRef = useToRef(value)

  const { count, indicator, items } = useSwiperChildren(childrenProp)

  const itemInstances = useMemo<SwiperItemInstance[]>(() => [], [])

  const touch = useTouch()

  const forceUpdate = useForceUpdate()

  const vertical = direction === "vertical"

  const rootRef = useRef()

  const rectRef = useRef<Rect>()

  const [offset, setOffset] = useState<number>(0)

  const swipingRef = useRef(false) // Whether to swiping manually

  const activeIndexRef = useRef<number>(0)

  const touchStartTimeRef = useRef(0)

  const autoplayTimerRef = useRef<NodeJS.Timeout>()

  const valueIndicatorRef = useRenderedRef(() => getIndicatorValue(value, count))

  const activeIndicatorRef = useRenderedRef(() => getIndicatorValue(activeIndexRef.current, count))

  const getDelta = useCallback(
    () => (vertical ? touch.deltaY : touch.deltaX),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const getCorrectDirection = useCallback(
    () => touch.direction === direction,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const getCustomRect = useCallback(
    () => ({
      width: width ?? rectRef.current?.width,
      height: height ?? rectRef.current?.height,
    }),
    [height, width],
  )

  const propRectRef = useRenderedRef(() => ({
    width,
    height,
  }))

  const getSize = useCallback(() => {
    const { height, width } = getCustomRect()
    return (vertical ? height : width) ?? 0
  }, [getCustomRect, vertical])

  const getTrackSize = useCallback(() => count * getSize(), [count, getSize])

  const getMinOffset = useCallback(() => {
    if (rectRef.current) {
      const base = (vertical ? rectRef.current?.height : rectRef.current?.width) ?? 0
      return base - getSize() * count
    }
    return 0
  }, [count, getSize, vertical])

  const getMaxCount = useCallback(() => Math.ceil(Math.abs(getMinOffset()) / getSize()), [
    getMinOffset,
    getSize,
  ])

  const getTargetActive = useCallback(
    (pace: number) => {
      if (pace) {
        if (loop) {
          return _.clamp(activeIndexRef.current + pace, -1, count)
        }
        return _.clamp(activeIndexRef.current + pace, 0, getMaxCount())
      }
      return activeIndexRef.current
    },
    [loop, getMaxCount, count],
  )

  const getTargetOffset = useCallback(
    (targetActive: number, offset = 0) => {
      const size = getSize()
      const minOffset = getMinOffset()
      let currentPosition = targetActive * size
      if (!loop) {
        currentPosition = Math.min(currentPosition, -minOffset)
      }

      let targetOffset = offset - currentPosition
      if (!loop) {
        targetOffset = _.clamp(targetOffset, getMinOffset(), 0)
      }
      return targetOffset
    },
    [getMinOffset, getSize, loop],
  )

  const moveTo = useCallback(
    ({ pace = 0, offset = 0, emitChange = false }) => {
      if (count <= 1) {
        return
      }

      const minOffset = getMinOffset()

      const targetActive = getTargetActive(pace)
      const targetOffset = getTargetOffset(targetActive, offset)
      if (loop) {
        if (itemInstances[0] && targetOffset !== minOffset) {
          const outRightBound = targetOffset < minOffset
          itemInstances[0].setOffset(outRightBound ? getTrackSize() : 0)
        }

        if (itemInstances[count - 1] && targetOffset !== 0) {
          const outLeftBound = targetOffset > 0
          itemInstances[count - 1].setOffset(outLeftBound ? -getTrackSize() : 0)
        }
      }

      const previousActiveIndex = activeIndexRef.current
      activeIndexRef.current = targetActive
      setOffset(targetOffset)

      if (emitChange && previousActiveIndex !== targetActive) {
        setValue(getIndicatorValue(targetActive, count))
      }
    },
    [
      count,
      getMinOffset,
      getTargetActive,
      getTargetOffset,
      loop,
      itemInstances,
      getSize,
      getTrackSize,
      setValue,
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

  // const previous = useCallback(() => {
  //   correctPosition()
  //   doubleRaf(() => {
  //     swipingRef.current = false
  //     moveTo({
  //       pace: -1,
  //       emitChange: true,
  //     })
  //   })
  // }, [correctPosition, moveTo])

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
      const correctDirection = getCorrectDirection()
      // if user starting to touchmove, prevent the event bubbling to
      // avoid affecting the parent components
      const shouldPrevent = correctDirection || touch.offsetY > touch.offsetX === vertical
      if (shouldPrevent) {
        preventDefault(event, stopPropagation)
      }

      if (correctDirection) {
        moveTo({ offset: getDelta() })
      }
    },
    [getCorrectDirection, getDelta, moveTo, stopPropagation, touch, touchable, vertical],
  )

  const onTouchEnd = useCallback(() => {
    if (!touchable || !swipingRef.current) {
      return
    }
    const duration = Date.now() - touchStartTimeRef.current

    const delta = getDelta()
    const speed = delta / duration
    const size = getSize()
    const shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta) > size / 2

    swipingRef.current = false
    const correctDirection = getCorrectDirection()
    if (shouldSwipe && correctDirection) {
      const offset = vertical ? touch.offsetY : touch.offsetX

      let pace: number

      if (loop) {
        pace = offset > 0 ? (delta > 0 ? -1 : 1) : 0
      } else {
        pace = -Math[delta > 0 ? "ceil" : "floor"](delta / size)
      }

      moveTo({
        pace,
        emitChange: true,
      })
    } else if (delta) {
      moveTo({ pace: 0 })
    }
    startAutoplay()
  }, [
    touchable,
    getDelta,
    getSize,
    getCorrectDirection,
    startAutoplay,
    vertical,
    touch.offsetY,
    touch.offsetX,
    loop,
    moveTo,
  ])

  const getTrackRect = useCallback(
    () =>
      new Promise<Rect>((resolve) => {
        nextTick(() =>
          resolve(
            Promise.all([
              getRect(rootRef),
              getComputedStyle(rootRef, ["width", "height"]),
            ]).then(([rect, style]) =>
              makeRect(
                style.width === "auto" ? rect.width : unitToPx(style.width),
                style.height === "auto" ? rect.height : unitToPx(style.height),
              ),
            ),
          ),
        )
      }),
    [],
  )

  const initialize = useCallback(
    async (activeIndex = valueRef.current) => {
      if (!rootRef.current) {
        return
      }
      rectRef.current = await getTrackRect()
      if (count) {
        activeIndex = Math.min(count - 1, activeIndex)
      }
      activeIndexRef.current = activeIndex
      swipingRef.current = true
      const targetOffset = getTargetOffset(activeIndex)
      setOffset(targetOffset)
      // Force update render
      if (targetOffset === offset) {
        forceUpdate()
      }
      itemInstances.forEach((item) => item.setOffset(0))
    },
    [valueRef, getTrackRect, count, getTargetOffset, offset, itemInstances, forceUpdate],
  )

  const resize = useCallback(() => nextTick(() => initialize(activeIndexRef.current)), [initialize])

  useMounted(initialize)

  useWindowResize(resize)

  useMounted(() => {
    startAutoplay()
    return stopAutoplay
  })

  useEffect(
    () => {
      const valueIndicator = valueIndicatorRef.current
      const activeIndicator = activeIndicatorRef.current
      if (valueIndicator !== activeIndicator) {
        try {
          stopAutoplay()
          swipeTo(valueIndicator)
        } finally {
          startAutoplay()
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [valueIndicatorRef.current],
  )

  const trackStyle = useRendered(() => {
    const style: CSSProperties = {
      transitionDuration: `${swipingRef.current ? 0 : duration}ms`,
      transform: `translate${vertical ? "Y" : "X"}(${addUnitPx(offset)})`,
    }

    const size = getSize?.()
    if (size) {
      const mainAxis = vertical ? "height" : "width"
      style[mainAxis] = `${addUnitPx(size)}`
      const crossAxis = vertical ? "width" : "height"
      const crossAxisValue = propRectRef.current[crossAxis]
      style[crossAxis] = crossAxisValue ? addUnitPx(crossAxisValue) : ""
    }
    return style
  })

  return (
    <View ref={rootRef} className={classNames(prefixClassname("swiper"), className)} {...restProps}>
      <SwiperContext.Provider
        value={{
          lazyRender,
          loop,
          direction,
          indicator: activeIndicatorRef.current,
          getSize,
          count,
          itemInstances,
        }}
      >
        <View
          className={classNames(prefixClassname("swiper__track"), {
            [prefixClassname("swiper__track--vertical")]: vertical,
          })}
          catchMove={stopPropagation}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          style={trackStyle}
          children={items}
        />
        {indicator}
      </SwiperContext.Provider>
    </View>
  )
}

export default Swiper
