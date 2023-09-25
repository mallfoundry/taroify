import * as React from "react"
import { CSSProperties, FC, ReactNode, useMemo, useRef, useState, useEffect } from "react"
import { getSystemInfoSync, nextTick } from "@tarojs/taro"
import { View } from "@tarojs/components"
import type { ITouchEvent } from "@tarojs/components/types/common"
import { cloneIconElement, isIconElement } from "@taroify/icons/utils"
import classNames from "classnames"
import { addUnitPx } from "../utils/format/unit"
import { getRect } from "../utils/dom/rect"
import { preventDefault } from "../utils/dom/event"
import { useTouch } from "../utils/touch"
import { closest } from "../utils/closest"
import { prefixClassname } from "../styles"
import {
  FloatingBubbleAxis,
  FloatingBubbleMagnetic,
  FloatingBubbleOffset,
  FloatingBubbleBoundary,
} from "./floating-bubble.shared"

export interface FloatingBubbleProps {
  className?: string
  style?: CSSProperties
  icon?: ReactNode
  gap?: number
  axis?: FloatingBubbleAxis
  magnetic?: FloatingBubbleMagnetic
  offset?: FloatingBubbleOffset
  onClick?: (event: ITouchEvent) => void
  onOffsetChange?: (x: number, y: number) => void
}

const FloatingBubble: FC<FloatingBubbleProps> = (props) => {
  const {
    className,
    style: styleProp,
    icon,
    gap = 24,
    axis = "y",
    magnetic,
    offset = { x: -1, y: -1 },
    onClick: onClickProp,
    onOffsetChange,
  } = props

  const touch = useTouch()

  const contentRef = useRef<Element>()
  const [stateVal, setStateVal] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [dragging, setDragging] = useState(false)
  const initialized = useRef(false)
  const prevX = useRef(0)
  const prevY = useRef(0)

  const windowHeight = useMemo(() => getSystemInfoSync().windowHeight, [])
  const windowWidth = useMemo(() => getSystemInfoSync().windowWidth, [])

  const boundary = useMemo<FloatingBubbleBoundary>(() => {
    return {
      top: gap,
      right: windowWidth - stateVal.width - gap,
      bottom: windowHeight - stateVal.height - gap,
      left: gap,
    }
  }, [gap, stateVal.height, stateVal.width, windowHeight, windowWidth])

  const rootStyle = useMemo(() => {
    const style: CSSProperties = {}
    const x = addUnitPx(stateVal.x)
    const y = addUnitPx(stateVal.y)
    style.transform = `translate3d(${x}, ${y}, 0)`

    if (dragging || !initialized) {
      style.transition = "none"
    }

    return style
  }, [dragging, stateVal.x, stateVal.y])

  const updateState = async () => {
    const { width, height } = await getRect(contentRef.current!)
    setStateVal({
      x: offset.x > -1 ? offset.x : windowWidth - width - gap,
      y: offset.y > -1 ? offset.y : windowHeight - height - gap,
      width,
      height,
    })
  }

  const onTouchStart = (event): void => {
    touch.start(event)
    setDragging(true)

    prevX.current = stateVal.x
    prevY.current = stateVal.y
  }

  const onTouchMove = (event): void => {
    preventDefault(event, true)
    touch.move(event)

    if (axis === "lock") return

    if (!touch.isTap) {
      if (axis === "x") {
        let nextX = prevX.current + touch.deltaX
        if (nextX < boundary.left) nextX = boundary.left
        if (nextX > boundary.right) nextX = boundary.right
        setStateVal({
          ...stateVal,
          x: nextX,
        })
      }

      if (axis === "y") {
        let nextY = prevY.current + touch.deltaY
        if (nextY < boundary.top) nextY = boundary.top
        if (nextY > boundary.bottom) nextY = boundary.bottom
        setStateVal({
          ...stateVal,
          y: nextY,
        })
      }

      if (axis === "xy") {
        let nextX = prevX.current + touch.deltaX
        if (nextX < boundary.left) nextX = boundary.left
        if (nextX > boundary.right) nextX = boundary.right
        let nextY = prevY.current + touch.deltaY
        if (nextY < boundary.top) nextY = boundary.top
        if (nextY > boundary.bottom) nextY = boundary.bottom
        setStateVal({
          ...stateVal,
          x: nextX,
          y: nextY,
        })
      }
    }
  }

  const onTouchEnd = (): void => {
    setDragging(false)

    nextTick(() => {
      if (magnetic === "x") {
        const nextX = closest([boundary.left, boundary.right], stateVal.x)
        setStateVal({
          ...stateVal,
          x: nextX,
        })
      }
      if (magnetic === "y") {
        const nextY = closest([boundary.top, boundary.bottom], stateVal.y)
        setStateVal({
          ...stateVal,
          y: nextY,
        })
      }

      if (!touch.isTap) {
        if (prevX.current !== stateVal.x || prevY.current !== stateVal.y) {
          onOffsetChange?.(stateVal.x, stateVal.y)
        }
      }
    })
  }

  const onClick = (event: ITouchEvent) => {
    if (touch.isTap) onClickProp?.(event)
    else preventDefault(event, true)
  }

  useEffect(() => {
    updateState()
    nextTick(() => {
      initialized.current = true
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    updateState()
  }, [windowWidth, windowHeight, gap, offset.y, offset.x])

  return (
    <View
      className={classNames(prefixClassname("floating-bubble"), className)}
      ref={contentRef}
      style={{
        ...rootStyle,
        ...styleProp,
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      onClick={onClick}
    >
      {icon && isIconElement(icon)
        ? cloneIconElement(icon, { className: prefixClassname("floating-bubble__icon") })
        : icon}
    </View>
  )
}

export default FloatingBubble
