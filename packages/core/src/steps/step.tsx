import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER } from "../styles/hairline"
import StepsContext from "./steps.context"

interface StepProps extends ViewProps {
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
    ...restProps
  } = props
  const { value = -1, direction, alternativeLabel } = useContext(StepsContext)
  const active = useMemo(() => activeProp || index === value, [activeProp, index, value])
  const completed = useMemo(() => completedProp || index < value, [completedProp, index, value])

  return (
    <View
      className={classNames(
        HAIRLINE_BORDER,
        prefixClassname("step"),
        prefixClassname(`step--${direction}`),
        {
          [prefixClassname("step--alternative-label")]:
            alternativeLabel && direction === "horizontal",
          [prefixClassname("step--active")]: active,
          [prefixClassname("step--completed")]: completed,
        },
        className,
      )}
      {...restProps}
    >
      <View className={classNames(prefixClassname("step__label"))} children={children ?? label} />
      <View className={prefixClassname("step__circle-container")}>
        {icon ? (
          cloneIconElement(icon, { className: prefixClassname("step__icon") })
        ) : (
          <View className={prefixClassname("step__circle")} />
        )}
      </View>
      <View className={classNames(prefixClassname("step__line"))} />
    </View>
  )
}

export default Step
