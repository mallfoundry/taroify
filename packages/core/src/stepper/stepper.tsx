import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useCallback,
  useMemo,
} from "react"
import { prefixClassname } from "../styles"
import { addNumber, formatNumber } from "../utils/format/number"
import { getLogger } from "../utils/logger"
import { useToRef } from "../utils/state"
import StepperButton from "./stepper-button"
import StepperInput from "./stepper-input"
import StepperContext from "./stepper.context"
import type { StepperActionType, StepperShape } from "./stepper.shared"

const { deprecated } = getLogger("Stepper")

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
            type: "decrease",
          })
        } else if (__children__.increase === undefined) {
          __children__.increase = cloneElement(element, {
            type: "increase",
          })
        }
      } else if (elementType === StepperInput) {
        __children__.input = element
      }
    })

    if (!children) {
      const element = <StepperButton />
      if (__children__.decrease === undefined) {
        __children__.decrease = cloneElement(element, { type: "decrease" })
      }

      if (__children__.input === undefined) {
        __children__.input = <StepperInput />
      }

      if (__children__.increase === undefined) {
        __children__.increase = cloneElement(element, { type: "increase" })
      }
    }

    return __children__
  }, [children])
}

export interface StepperProps extends ViewProps {
  defaultValue?: number | string
  value?: number | string
  min?: number
  max?: number
  step?: number
  size?: number | string
  disabled?: boolean
  precision?: number
  longPress?: boolean
  shape?: StepperShape
  children?: ReactNode

  onChange?(value: number | string): void
}

function Stepper(props: StepperProps) {
  const {
    className,
    defaultValue,
    value: valueProp,
    min = 1,
    max = Number.MAX_VALUE,
    step = 1,
    size,
    disabled,
    precision = 0,
    longPress = true,
    shape = "rounded",
    children: childrenProp,
    onChange: onChangeProp,
    ...restProps
  } = props

  if (shape === "round") {
    deprecated('Use the shape="circular" prop instead of the shape="round" prop')
  }

  const { decrease, input, increase } = useStepperChildren(childrenProp)

  const { value = 0, setValue } = useUncontrolled({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  })

  const formatValue = useCallback(
    (value: string | number) => {
      if (value === "") {
        return value
      }
      let valueCache = value
      valueCache = formatNumber(String(valueCache), precision > 0)
      valueCache = valueCache === "" ? 0 : +valueCache
      valueCache = Number.isNaN(valueCache) ? +min : valueCache
      valueCache = Math.max(Math.min(+max, valueCache), +min)

      // format decimal
      if (precision > 0) {
        valueCache = valueCache.toFixed(+precision)
      }

      return valueCache
    },
    [max, min, precision],
  )

  const valueRef = useToRef(formatValue(value))

  const onStep = useCallback(
    (actionType: StepperActionType) => {
      const diff = actionType === "decrease" ? -step : +step
      setValue(formatValue(addNumber(valueRef.current as number, diff)))
    },
    [formatValue, setValue, step, valueRef],
  )

  return (
    <StepperContext.Provider
      value={{
        value: valueRef.current,
        min,
        max,
        size,
        disabled,
        precision,
        longPress,
        formatValue,
        onChange: setValue,
        onStep,
      }}
    >
      <View
        className={classNames(
          prefixClassname("stepper"),
          {
            [prefixClassname("stepper--square")]: shape === "square",
            [prefixClassname("stepper--rounded")]: shape === "rounded",
            [prefixClassname("stepper--circular")]: shape === "circular" || shape === "round",
          },
          className,
        )}
        {...restProps}
      >
        {decrease}
        {input}
        {increase}
      </View>
    </StepperContext.Provider>
  )
}

export default Stepper
