import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import {
  Children,
  cloneElement,
  createElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
} from "react"
import { prefixClassname } from "../styles"
import { addNumber, formatNumber } from "../utils/format/number"
import { useToRef } from "../utils/state"
import StepperButton from "./stepper-button"
import StepperInput from "./stepper-input"
import StepperContext from "./stepper.context"
import { StepperActionType } from "./stepper.shared"

interface StepperChildren {
  decrease?: ReactNode
  input?: ReactNode
  increase?: ReactNode
}

function useStepperChildren(children?: ReactNode): StepperChildren {
  return useMemo(() => {
    const __children__: StepperChildren = {}

    Children.forEach(children, (child: ReactNode) => {
      if (!isValidElement(child)) {
        return
      }

      const element = child as ReactElement
      const elementType = element.type

      if (elementType === StepperButton) {
        if (__children__.decrease === undefined) {
          __children__.decrease = cloneElement(element, {
            type: StepperActionType.Decrease,
          })
        } else if (__children__.increase === undefined) {
          __children__.increase = cloneElement(element, {
            type: StepperActionType.Increase,
          })
        }
      } else if (elementType === StepperInput) {
        __children__.input = element
      }
    })

    if (!children) {
      if (__children__.decrease === undefined) {
        __children__.decrease = createElement(StepperButton, {
          // @ts-ignore
          type: StepperActionType.Decrease,
        })
      }

      if (__children__.input === undefined) {
        __children__.input = <StepperInput />
      }

      if (__children__.increase === undefined) {
        __children__.increase = createElement(StepperButton, {
          // @ts-ignore
          type: StepperActionType.Increase,
        })
      }
    }

    return __children__
  }, [children])
}

enum StepperShape {
  Square = "square",
  Round = "round",
}

type StepperShapeString = "square" | "round"

export interface StepperProps {
  className?: string
  value?: number | string
  min?: number
  max?: number
  step?: number
  size?: number | string
  disabled?: boolean
  precision?: number
  longPress?: boolean
  shape?: StepperShape | StepperShapeString
  children?: ReactNode

  onChange?(value: number | string): void
}

function Stepper(props: StepperProps) {
  const {
    className,
    value: valueProp = 0,
    min = 1,
    max = Number.MAX_VALUE,
    step = 1,
    size,
    disabled,
    precision = 0,
    longPress = true,
    shape = StepperShape.Square,
    onChange,
  } = props

  const { decrease, input, increase } = useStepperChildren(props.children)

  const valueRef = useToRef(valueProp)

  const formatValue = useCallback(
    (value: string | number) => {
      if (value === "") {
        return value
      }

      value = formatNumber(String(value), precision > 0)
      value = value === "" ? 0 : +value
      value = Number.isNaN(value) ? +min : value
      value = Math.max(Math.min(+max, value), +min)

      // format decimal
      if (precision > 0) {
        value = value.toFixed(+precision)
      }

      return value
    },
    [max, min, precision],
  )

  const onStep = useCallback(
    (actionType: StepperActionType) => {
      const diff = actionType === StepperActionType.Decrease ? -step : +step
      const value = formatValue(addNumber(valueRef.current as number, diff))
      onChange?.(value)
    },
    [formatValue, onChange, step, valueRef],
  )

  return (
    <StepperContext.Provider
      value={{
        value: formatValue(valueProp),
        min,
        max,
        size,
        disabled,
        precision,
        longPress,
        formatValue,
        onChange,
        onStep,
      }}
    >
      <View
        className={classNames(
          prefixClassname("stepper"),
          {
            [prefixClassname("stepper--round")]: shape === StepperShape.Round,
          },
          className,
        )}
      >
        {decrease}
        {input}
        {increase}
      </View>
    </StepperContext.Provider>
  )
}

export default Stepper
