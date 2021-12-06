import { ITouchEvent, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { useCallback, useContext, useRef } from "react"
import { prefixClassname } from "../styles"
import { preventDefault } from "../utils/dom/event"
import { getSizeStyle } from "../utils/format/unit"
import StepperContext from "./stepper.context"
import { StepperActionType } from "./stepper.shared"

const LONG_PRESS_INTERVAL = 200

const LONG_PRESS_START_TIME = 600

interface StepperButtonProps extends ViewProps {
  disabled?: boolean

  onClick?(event: ITouchEvent): void
}

interface InternalStepperButtonProps extends StepperButtonProps {
  type?: StepperActionType
}

function StepperButton(props: StepperButtonProps) {
  const {
    className,
    style,
    type = "decrease",
    disabled: disabledProp,
    onClick,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
    ...restProps
  } = props as InternalStepperButtonProps

  const {
    value = 0,
    min = 0,
    max = 0,
    size,
    disabled: disabledCtx,
    longPress,
    onStep,
  } = useContext(StepperContext)

  const disabled =
    disabledProp ||
    disabledCtx ||
    (type === "decrease" && value <= min) ||
    (type === "increase" && value >= max)

  const longPressRef = useRef(false)

  let longPressTimerRef = useRef<NodeJS.Timeout>()

  const longPressStep = useCallback(() => {
    longPressTimerRef.current = setTimeout(() => {
      onStep?.(type)
      longPressStep()
    }, LONG_PRESS_INTERVAL)
  }, [onStep, type])

  const handleTouchStart = useCallback(() => {
    if (longPress) {
      longPressRef.current = false
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
      longPressTimerRef.current = setTimeout(() => {
        longPressRef.current = true
        onStep?.(type)
        longPressStep()
      }, LONG_PRESS_START_TIME)
    }
  }, [longPress, longPressStep, onStep, type])

  const handleTouchEnd = useCallback(
    (event: ITouchEvent) => {
      if (longPress) {
        if (longPressTimerRef.current) {
          clearTimeout(longPressTimerRef.current)
        }
        if (longPressRef.current) {
          preventDefault(event)
        }
      }
    },
    [longPress],
  )

  return (
    <View
      className={classNames(
        prefixClassname(`stepper__${type}`),
        {
          [prefixClassname(`stepper__${type}--disabled`)]: disabled,
        },
        className,
      )}
      style={getSizeStyle(size)}
      onClick={(event) => {
        preventDefault(event)
        onClick?.(event)
        if (!disabled) {
          onStep?.(type)
        }
      }}
      onTouchStart={(event) => {
        onTouchStart?.(event)
        if (!disabled) {
          handleTouchStart()
        }
      }}
      onTouchEnd={(event) => {
        onTouchEnd?.(event)
        handleTouchEnd(event)
      }}
      onTouchCancel={(event) => {
        onTouchCancel?.(event)
        handleTouchEnd(event)
      }}
      {...restProps}
    />
  )
}

export default StepperButton
