import { useUncontrolled } from "@taroify/hooks"
import { ITouchEvent, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
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
  useMemo,
  useRef,
} from "react"
import { prefixClassname } from "../styles"
import { getClientCoordinates, preventDefault, stopPropagation } from "../utils/dom/event"
import { getRect } from "../utils/dom/rect"
import { addNumber } from "../utils/format/number"
import { addUnitPx } from "../utils/format/unit"
import { useTouch } from "../utils/touch"
import SliderThumb from "./slider-thumb"
import SliderContext from "./slider.context"

type SliderValue = number | [number, number] | number[]

enum SliderDragStatus {
  Start = "start",
  Dragging = "dragging",
  End = "end",
}

type SliderOrientation = "horizontal" | "vertical"

interface SliderChildren {
  thumb1: ReactNode
  thumb2: ReactNode
}

function useSliderChildren(children?: ReactNode, range?: boolean): SliderChildren {
  return useMemo(() => {
    const __children__: SliderChildren = {
      thumb1: undefined,
      thumb2: undefined,
    }

    Children.forEach(children, (child: ReactNode) => {
      if (!isValidElement(child)) {
        return
      }
      const element = child as ReactElement

      if (__children__.thumb1 === undefined) {
        __children__.thumb1 = element
      } else if (__children__.thumb2 === undefined) {
        __children__.thumb2 = element
      }
    })

    __children__.thumb1 = __children__.thumb1 ?? <SliderThumb />

    if (range) {
      __children__.thumb1 = cloneElement(__children__.thumb1 as ReactElement, {
        key: 0,
        index: 0,
      })

      __children__.thumb2 = __children__.thumb2 ?? <SliderThumb />
      __children__.thumb2 = cloneElement(__children__.thumb2 as ReactElement, {
        key: 1,
        index: 1,
      })
    } else {
      __children__.thumb1 = cloneElement(__children__.thumb1 as ReactElement, {
        index: undefined,
      })
    }

    return __children__
  }, [children, range])
}

export interface SliderProps extends ViewProps {
  style?: CSSProperties
  step?: number
  min?: number
  max?: number
  defaultValue?: any
  value?: any
  range?: boolean
  size?: number
  orientation?: SliderOrientation
  disabled?: boolean
  children?: ReactNode

  onChange?(value: any): void
}

function Slider(props: SliderProps) {
  const {
    className,
    style = {},
    defaultValue,
    value: valueProp = undefined,
    min = 0,
    max = 100,
    step = 1,
    range = false,
    size,
    orientation = "horizontal",
    disabled = false,
    children,
    onClick,
    onChange: onChangeProp,
    ...restProps
  } = props

  const { value = 0, setValue } = useUncontrolled({
    defaultValue,
    value: valueProp,
    onChange: onChangeProp,
  })

  const { thumb1, thumb2 } = useSliderChildren(children, range)

  const vertical = orientation === "vertical"

  const rootRef = useRef<HTMLElement>()

  const dragStatusRef = useRef<SliderDragStatus>()

  const startValueRef = useRef<SliderValue>(0)

  const currentValueRef = useRef<SliderValue>(0)

  const buttonIndexRef = useRef<number>()

  const touch = useTouch()

  const scope = useMemo(() => Number(max) - Number(min), [max, min])

  const isRange = useCallback(
    (val: unknown): val is [number, number] => range && Array.isArray(val),
    [range],
  )

  // 计算选中条的长度百分比
  const calcMainAxis = useCallback(() => {
    if (isRange(value)) {
      return `${((value[1] - value[0]) * 100) / scope}%`
    }
    return `${(((value as number) - Number(min)) * 100) / scope}%`
  }, [isRange, min, scope, value])

  // 计算选中条的开始位置的偏移量
  const calcOffset = useCallback(() => {
    if (isRange(value)) {
      return `${((value[0] - Number(min)) * 100) / scope}%`
    }
    return "0%"
  }, [isRange, min, scope, value])

  const wrapperStyle = useMemo<CSSProperties>(() => {
    const crossAxis = vertical ? "width" : "height"
    return {
      ...style,
      [crossAxis]: addUnitPx(size) ?? "",
    }
  }, [size, style, vertical])

  const trackStyle = useMemo<CSSProperties>(() => {
    const mainAxis = vertical ? "height" : "width"
    return {
      [mainAxis]: calcMainAxis(),
      left: vertical ? "" : calcOffset(),
      top: vertical ? calcOffset() : "",
      transition: dragStatusRef.current ? "none" : "",
    }
  }, [calcMainAxis, calcOffset, vertical])

  const formatValue = (value: number) => {
    value = _.clamp(value, min, max)
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

  const updateValue = (newValue: SliderValue) => {
    if (isRange(newValue)) {
      newValue = handleOverlap(newValue).map(formatValue) as [number, number]
    } else {
      newValue = formatValue(newValue as number)
    }

    if (!isSameValue(newValue, value)) {
      setValue(newValue as any)
    }
  }

  const handleClick = (event: ITouchEvent) => {
    onClick?.(event)
    stopPropagation(event)

    if (disabled) {
      return
    }

    getRect(rootRef).then((rect) => {
      const { clientX, clientY } = getClientCoordinates(event)

      const delta = vertical ? clientY - rect.top : clientX - rect.left
      const total = vertical ? rect.height : rect.width
      const newValue = Number(min) + (delta / total) * scope

      if (isRange(value)) {
        const [left, right] = value
        const middle = (left + right) / 2

        if (newValue <= middle) {
          updateValue([newValue, right])
        } else {
          updateValue([left, newValue])
        }
      } else {
        updateValue(newValue)
      }
    })
  }

  const onTouchStart = (event: ITouchEvent, index?: number) => {
    if (typeof index === "number") {
      // save index of current button
      buttonIndexRef.current = index
    }

    if (disabled) {
      return
    }

    touch.start(event)
    currentValueRef.current = value

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

    preventDefault(event, true)
    touch.move(event)
    dragStatusRef.current = SliderDragStatus.Dragging

    getRect(rootRef).then((rect) => {
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

  const onTouchEnd = () => {
    if (disabled) {
      return
    }

    if (dragStatusRef.current === SliderDragStatus.Dragging) {
      updateValue(currentValueRef.current)
    }

    dragStatusRef.current = SliderDragStatus.End
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
      onClick={handleClick}
      {...restProps}
    >
      <SliderContext.Provider
        value={{
          onTouchStart,
          onTouchMove,
          onTouchEnd,
        }}
      >
        <View className={prefixClassname("slider__track")} style={trackStyle}>
          {range ? [thumb1, thumb2] : thumb1}
        </View>
      </SliderContext.Provider>
    </View>
  )
}

export default Slider
