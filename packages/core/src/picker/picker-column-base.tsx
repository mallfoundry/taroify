import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { prefixClassname } from "../styles"
import { getComputedStyle } from "../utils/dom/computed-style"
import { preventDefault } from "../utils/dom/event"
import { addUnitPx } from "../utils/format/unit"
import { useToRef } from "../utils/state"
import { useTouch } from "../utils/touch"
import PickerOption from "./picker-option"
import { PickerOptionObject } from "./picker.shared"

const DEFAULT_DURATION = 200

// 惯性滑动思路:
// 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_LIMIT_TIME` 且 move
// 距离大于 `MOMENTUM_LIMIT_DISTANCE` 时，执行惯性滑动
const MOMENTUM_LIMIT_TIME = 300
const MOMENTUM_LIMIT_DISTANCE = 15

async function getElementTranslateY(element: Element) {
  const style = await getComputedStyle(element, ["transform", "webkitTransform"])
  const transform = style.transform || style.webkitTransform
  const translateY = transform.slice(7, transform.length - 1).split(", ")[5]

  return Number(translateY)
}

export interface PickerColumnBaseProps {
  value: any
  className?: string
  readonly?: boolean
  options?: PickerOptionObject[]

  onChange?(option: PickerOptionObject, emitChange?: boolean): void
}

export default function PickerColumnBase(props: PickerColumnBaseProps) {
  const { value, className, readonly, options = [], onChange } = props
  const wrapperRef = useRef<HTMLElement>()
  const movingRef = useRef<boolean>()
  const startOffsetRef = useRef<number>(0)
  const momentumOffsetRef = useRef<number>(0)
  const touchStartTimeRef = useRef<number>(0)

  const transitionEndTriggerRef = useRef<() => void>()

  const touch = useTouch()
  const itemHeight = 44
  const activeIndexRef = useRef(-1)
  const [activeOffset, setActiveOffset] = useState<number>(0)
  const activeOffsetRef = useToRef(activeOffset)

  const [duration, setDuration] = useState<number>(0)

  const baseOffset = useMemo(() => (itemHeight * (6 - 1)) / 2, [])

  const count = useMemo(() => _.size(options), [options])

  const adjustIndex = useCallback(
    (index: number) => {
      index = _.clamp(index, 0, count)
      for (let i = index; i < count; i++) {
        if (!options[i].disabled) return i
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!options[i].disabled) return i
      }
      return index
    },
    [count, options],
  )

  const setIndex = useCallback(
    (index: number, emitChange?: boolean) => {
      index = adjustIndex(index) || 0

      const offset = -index * itemHeight
      const trigger = () => {
        if (index !== activeIndexRef.current) {
          activeIndexRef.current = index
          const option = options[index]
          onChange?.(option, emitChange)
        }
      }

      // trigger the change event after transitionend when moving
      if (movingRef.current && offset !== activeOffsetRef.current) {
        transitionEndTriggerRef.current = trigger
      } else {
        trigger()
      }

      setActiveOffset(offset)
    },
    [activeOffsetRef, adjustIndex, onChange, options],
  )

  const getIndexByValue = useCallback(
    (aValue?: any) => _.findIndex(options, ({ value: iValue }) => iValue === aValue),
    [options],
  )

  useEffect(() => {
    setIndex(getIndexByValue(value))
  }, [getIndexByValue, setIndex, value])

  const getIndexByOffset = useCallback(
    (offset: number) => _.clamp(Math.round(-offset / itemHeight), 0, count - 1),
    [count],
  )

  const momentum = useCallback(
    (distance: number, duration: number) => {
      const speed = Math.abs(distance / duration)

      distance = activeOffset + (speed / 0.003) * (distance < 0 ? -1 : 1)
      const index = getIndexByOffset(distance)
      setDuration(1000)
      setIndex(index, true)
    },
    [activeOffset, getIndexByOffset, setIndex],
  )

  const stopMomentum = useCallback(() => {
    movingRef.current = false
    setDuration(0)

    if (transitionEndTriggerRef.current) {
      transitionEndTriggerRef.current?.()
      transitionEndTriggerRef.current = undefined
    }
  }, [])

  const onItemClick = useCallback(
    (index: number) => {
      if (movingRef.current || readonly) {
        return
      }

      transitionEndTriggerRef.current = undefined
      setDuration(DEFAULT_DURATION)
      setIndex(index, true)
    },
    [readonly, setIndex],
  )

  const onTouchStart = useCallback(
    async (event: ITouchEvent) => {
      if (readonly) {
        return
      }

      touch.start(event)

      if (movingRef.current) {
        const translateY = await getElementTranslateY(wrapperRef.current!)
        const offset = Math.min(0, translateY - baseOffset)
        setActiveOffset(offset)
        startOffsetRef.current = offset
      } else {
        startOffsetRef.current = activeOffset
      }

      touchStartTimeRef.current = Date.now()
      momentumOffsetRef.current = startOffsetRef.current
      setDuration(0)
    },
    [activeOffset, baseOffset, readonly, touch],
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

      const now = Date.now()
      if (now - touchStartTimeRef.current > MOMENTUM_LIMIT_TIME) {
        touchStartTimeRef.current = now
        momentumOffsetRef.current = activeOffset
      }

      setActiveOffset(
        _.clamp(startOffsetRef.current + touch.deltaY, -(count * itemHeight), itemHeight),
      )
    },
    [activeOffset, count, readonly, touch],
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
      transform: `translate3d(0, ${addUnitPx(activeOffset + baseOffset)}, 0)`,
      transition: `transform ${duration}ms`,
    }),
    [activeOffset, baseOffset, duration],
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
        style={wrapperStyle}
        className={prefixClassname("picker-column__wrapper")}
        onTransitionEnd={stopMomentum}
      >
        {
          //
          _.map(options, (option, index) => (
            <PickerOption {...option} onClick={() => onItemClick(index)} />
          ))
        }
      </View>
    </View>
  )
}
