import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER } from "../styles/hairline"
import StepsContext from "./steps.context"
import { StepsDirection } from "./steps.shared"

interface StepProps {
  className?: string
  index?: number
  active?: boolean
  completed?: boolean
  // error?: boolean
  disabled?: boolean
  icon?: ReactNode
  label?: ReactNode
  children?: ReactNode
}

function Step(props: StepProps) {
  const {
    className,
    index = -1,
    active: activeProp = false,
    completed: completedProp = false,
    icon,
    label,
    children,
  } = props
  const { activeStep = -1, activeColor, direction, alternativeLabel } = useContext(StepsContext)
  const active = useMemo(() => activeProp || index === activeStep, [activeProp, index, activeStep])
  const completed = useMemo(() => completedProp || index < activeStep, [
    completedProp,
    index,
    activeStep,
  ])

  const labelStyle = useMemo(
    () => ({
      color: active ? activeColor : "",
    }),
    [active, activeColor],
  )

  const circleStyle = useMemo(
    () => ({
      background: active || completed ? activeColor : "",
    }),
    [active, completed, activeColor],
  )

  const iconStyle = useMemo(
    () => ({
      color: active || completed ? activeColor : "",
    }),
    [active, completed, activeColor],
  )

  const lineStyle = useMemo(
    () => ({
      background: completed ? activeColor : "",
    }),
    [completed, activeColor],
  )

  return (
    <View
      className={classNames(
        HAIRLINE_BORDER,
        prefixClassname("step"),
        prefixClassname(`step--${direction}`),
        {
          [prefixClassname("step--alternative-label")]:
            alternativeLabel && direction === StepsDirection.Horizontal,
          [prefixClassname("step--active")]: active,
          [prefixClassname("step--completed")]: completed,
        },
        className,
      )}
    >
      <View
        className={classNames(prefixClassname("step__label"))}
        style={labelStyle}
        children={children ?? label}
      />
      <View className={prefixClassname("step__circle-container")}>
        {icon ? (
          cloneIconElement(icon, { className: prefixClassname("step__icon"), style: iconStyle })
        ) : (
          <View className={prefixClassname("step__circle")} style={circleStyle} />
        )}
      </View>
      <View className={classNames(prefixClassname("step__line"))} style={lineStyle} />
    </View>
  )
}

export default Step
