import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, useCallback, useMemo, useRef } from "react"
import { prefixClassname } from "../styles"
import { getClientCoordinates, preventDefault, stopPropagation } from "../utils/dom/event"
import { addNumber, clamp } from "../utils/format/number"
import { addUnitPx } from "../utils/format/unit"
import { getBoundingClientRect } from "../utils/rect"
import { useTouch } from "../utils/touch"
import SliderThumb from "./slider-thumb"

type SliderValue = number | [number, number]

enum SliderDragStatus {
  Start = "start",
  Dragging = "dragging",
  End = "end",
}

enum SliderOrientation {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

type SliderOrientationString = "horizontal" | "vertical"

interface SliderProps {
  className?: string
  style?: CSSProperties
  value?: SliderValue
  step?: number
  min?: number
  max?: number
  range?: boolean
  size?: number
  activeColor?: string
  inactiveColor?: string

  orientation?: SliderOrientation | SliderOrientationString

  disabled?: boolean

  onChange?(value: SliderValue): void
}

function Slider(props: SliderProps) {
  const {
    className,
    style = {},
    value: valueProp = 0,
    min = 0,
    max = 100,
    step = 1,
    range = false,
    size,
    activeColor,
    inactiveColor,
    orientation = SliderOrientation.Horizontal,
    disabled = false,
    onChange,
  } = props
  const vertical = orientation === SliderOrientation.Vertical
  console.log(valueProp)

  const rootRef = useRef<HTMLElement>()

  const dragStatusRef = useRef<SliderDragStatus>()

  const startValueRef = useRef<SliderValue>(0)

  const currentValueRef = useRef<SliderValue>(0)

  const buttonIndexRef = useRef<number>()

  const touch = useTouch()

  const scope = Number(max) - Number(min)

  const isRange = useCallback(
    (val: unknown): val is [number, number] => range && Array.isArray(val),
    [range],
  )

  // 计算选中条的长度百分比
  const calcMainAxis = useCallback(() => {
    if (isRange(valueProp)) {
      return `${((valueProp[1] - valueProp[0]) * 100) / scope}%`
    }
    return `${((valueProp - Number(min)) * 100) / scope}%`
  }, [isRange, min, scope, valueProp])

  // 计算选中条的开始位置的偏移量
  const calcOffset = useCallback(() => {
    if (isRange(valueProp)) {
      return `${((valueProp[0] - Number(min)) * 100) / scope}%`
    }
    return "0%"
  }, [isRange, min, scope, valueProp])

  const wrapperStyle = useMemo<CSSProperties>(() => {
    const crossAxis = vertical ? "width" : "height"
    return {
      ...style,
      background: inactiveColor ?? "",
      [crossAxis]: addUnitPx(size) ?? "",
    }
  }, [inactiveColor, size, style, vertical])

  const trackStyle = useMemo<CSSProperties>(() => {
    const mainAxis = vertical ? "height" : "width"
    return {
      [mainAxis]: calcMainAxis(),
      left: vertical ? "" : calcOffset(),
      top: vertical ? calcOffset() : "",
      background: activeColor ?? "",
      transition: dragStatusRef.current ? "none" : "",
    }
  }, [activeColor, calcMainAxis, calcOffset, vertical])

  const formatValue = (value: number) => {
    value = clamp(value, min, max)
    const diff = Math.round((value - min) / step) * step
    return addNumber(min, diff)
  }

  const isSameValue = (newValue: SliderValue, oldValue: SliderValue) =>
    JSON.stringify(newValue) === JSON.stringify(oldValue)

  const handleOverlap = (value: [number, number]) => {
    if (value[0] > value[1]) {
      return value.slice(0).reverse()
    }
    return value
  }

  const updateValue = (value: SliderValue, end?: boolean) => {
    if (isRange(value)) {
      value = handleOverlap(value).map(formatValue) as [number, number]
    } else {
      value = formatValue(value)
    }

    if (!isSameValue(value, valueProp)) {
      onChange?.(value)
    }
  }

  const onClick = (event: ITouchEvent) => {
    stopPropagation(event)

    if (disabled) {
      return
    }

    getBoundingClientRect(rootRef).then((rect) => {
      const { clientX, clientY } = getClientCoordinates(event)

      const delta = vertical ? clientY - rect.top : clientX - rect.left
      const total = vertical ? rect.height : rect.width
      const newValue = Number(min) + (delta / total) * scope

      if (isRange(valueProp)) {
        const [left, right] = valueProp
        const middle = (left + right) / 2

        if (newValue <= middle) {
          updateValue([newValue, right], true)
        } else {
          updateValue([left, newValue], true)
        }
      } else {
        updateValue(newValue, true)
      }
    })
  }

  const onTouchStart = (event: ITouchEvent) => {
    if (disabled) {
      return
    }

    touch.start(event)
    currentValueRef.current = valueProp

    if (isRange(currentValueRef.current)) {
      startValueRef.current = currentValueRef.current.map(formatValue) as [number, number]
    } else {
      startValueRef.current = formatValue(currentValueRef.current as number)
    }

    dragStatusRef.current = SliderDragStatus.Start
  }

  const onTouchMove = (event: ITouchEvent) => {
    if (disabled) {
      return
    }

    // if (dragStatusRef.current === SliderDragStatus.Start) {
    //   emit("drag-start", event)
    // }

    preventDefault(event, true)
    touch.move(event)
    dragStatusRef.current = SliderDragStatus.Dragging

    getBoundingClientRect(rootRef).then((rect) => {
      const delta = vertical ? touch.deltaY : touch.deltaX
      const total = vertical ? rect.height : rect.width
      const diff = (delta / total) * scope

      if (isRange(startValueRef.current)) {
        ;(currentValueRef.current as [number, number])[buttonIndexRef.current as number] =
          startValueRef.current[buttonIndexRef.current as number] + diff
      } else {
        currentValueRef.current = (startValueRef.current as number) + diff
      }
      updateValue(currentValueRef.current)
    })
  }

  const onTouchEnd = (event: ITouchEvent) => {
    if (disabled) {
      return
    }

    if (dragStatusRef.current === SliderDragStatus.Dragging) {
      updateValue(currentValueRef.current, true)
    }

    dragStatusRef.current = SliderDragStatus.End
  }

  const renderButton = (index?: 0 | 1) => {
    return (
      <SliderThumb
        key={index}
        index={index}
        onTouchStart={(event) => {
          if (typeof index === "number") {
            // save index of current button
            buttonIndexRef.current = index
          }
          onTouchStart(event)
        }}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
    )
  }

  return (
    <View
      ref={rootRef}
      className={classNames(
        classNames(prefixClassname("slider"), {
          [prefixClassname("slider--vertical")]: vertical,
          [prefixClassname("slider--disabled")]: disabled,
        }),
        className,
      )}
      style={wrapperStyle}
      onClick={onClick}
    >
      <View className={prefixClassname("slider__track")} style={trackStyle}>
        {range ? [renderButton(0), renderButton(1)] : renderButton()}
      </View>
    </View>
  )
}

export default Slider
