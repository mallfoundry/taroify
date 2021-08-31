import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useCallback, useMemo, useRef, useState } from "react"
import { prefixClassname } from "../styles"
import { getComputedStyle } from "../utils/dom/computed-style"
import { preventDefault } from "../utils/dom/event"
import { clamp } from "../utils/format/number"
import { useTouch } from "../utils/touch"

const DEFAULT_DURATION = 200

const MOMENTUM_LIMIT_TIME = 300
const MOMENTUM_LIMIT_DISTANCE = 15

async function getElementTranslateY(element: Element) {
  const style = await getComputedStyle(element, ["transform", "webkitTransform"])
  const transform = style.transform || style.webkitTransform
  const translateY = transform.slice(7, transform.length - 1).split(", ")[5]

  return Number(translateY)
}

// interface PickerColumnChildren {
//   // optionObjects
// }

// function usePickerColumnChildren

interface PickerColumnProps {
  className?: string
  readonly?: boolean
  children?: ReactNode
}

export default function PickerColumn(props: PickerColumnProps) {
  const { className, readonly, children } = props
  const wrapperRef = useRef<HTMLElement>()
  const movingRef = useRef<boolean>()
  const startOffsetRef = useRef<number>(0)
  const momentumOffsetRef = useRef<number>(0)
  const touchStartTimeRef = useRef<number>(0)

  const transitionEndTriggerRef = useRef<() => void>()

  const touch = useTouch()
  const itemHeight = 44

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [activeOffset, setActiveOffset] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)

  const baseOffset = () => (itemHeight * (6 - 1)) / 2

  const count = () => 22

  const adjustIndex = (index: number) => {
    index = clamp(index, 0, count())
    return index
  }

  const setIndex = (index: number, emitChange?: boolean) => {
    index = adjustIndex(index) || 0

    const offset = -index * itemHeight
    const trigger = () => {
      if (index !== activeIndex) {
        setActiveIndex(index)

        // if (emitChange) {
        //   emit("change", index)
        // }
      }
    }

    // trigger the change event after transitionend when moving
    if (movingRef.current && offset !== activeOffset) {
      transitionEndTriggerRef.current = trigger
    } else {
      trigger()
    }

    // state.offset = offset;
  }

  const getIndexByOffset = useCallback(
    (offset: number) => clamp(Math.round(-offset / itemHeight), 0, count() - 1),
    [],
  )

  const momentum = useCallback(
    (distance: number, duration: number) => {
      const speed = Math.abs(distance / duration)

      distance = activeOffset + (speed / 0.003) * (distance < 0 ? -1 : 1)

      const index = getIndexByOffset(distance)
      console.log(index)

      // duration = +props.swipeDuration;
      setIndex(index, true)
    },
    [activeOffset, getIndexByOffset, setIndex],
  )

  const onTouchStart = useCallback(
    async (event: ITouchEvent) => {
      if (readonly) {
        return
      }

      touch.start(event)

      if (movingRef.current) {
        const translateY = await getElementTranslateY(wrapperRef.current!)
        const offset = Math.min(0, translateY - baseOffset())
        setActiveOffset(offset)
        startOffsetRef.current = offset
      } else {
        startOffsetRef.current = activeOffset
      }

      setDuration(0)
      // state.duration = 0
      touchStartTimeRef.current = Date.now()
      momentumOffsetRef.current = startOffsetRef.current
      // transitionEndTrigger = null
    },
    [activeOffset, readonly, touch],
  )

  const onTouchMove = useCallback(
    (event: ITouchEvent) => {
      if (readonly) {
        return
      }

      touch.move(event)

      if (touch.isVertical()) {
        movingRef.current = true
        preventDefault(event, true)
      }

      setActiveOffset(
        clamp(startOffsetRef.current + touch.deltaY, -(count() * itemHeight), itemHeight),
      )

      const now = Date.now()
      if (now - touchStartTimeRef.current > MOMENTUM_LIMIT_TIME) {
        touchStartTimeRef.current = now
        momentumOffsetRef.current = activeOffset
      }
    },
    [activeOffset, readonly, touch],
  )

  const onTouchEnd = useCallback(() => {
    if (readonly) {
      return
    }

    const distance = activeOffset - momentumOffsetRef.current
    const duration = Date.now() - touchStartTimeRef.current
    const allowMomentum =
      duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE

    if (allowMomentum) {
      momentum(distance, duration)
      return
    }

    const index = getIndexByOffset(activeOffset)
    // state.duration = DEFAULT_DURATION
    setDuration(DEFAULT_DURATION)
    setIndex(index, true)

    // compatible with desktop scenario
    // use setTimeout to skip the click event Emitted after touchstart
    setTimeout(() => {
      movingRef.current = false
    }, 0)
  }, [getIndexByOffset, momentum, activeOffset, readonly, setIndex])

  const wrapperStyle = useMemo(
    () => ({
      transform: `translate3d(0, ${activeOffset + baseOffset()}px, 0)`,
      transitionDuration: `${duration}ms`,
      transitionProperty: duration ? "all" : "none",
    }),
    [duration, activeOffset],
  )

  return (
    <View
      className={classNames(prefixClassname("picker-column"), className)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      <View
        ref={wrapperRef}
        className={prefixClassname("picker-column__wrapper")}
        style={wrapperStyle}
        children={children}
      />
    </View>
  )
}
