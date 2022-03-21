import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { PropsWithChildren } from "react"
import { prefixClassname } from "../styles"
import ButtonGroupContext from "./button-group.context"
import { ButtonColor, ButtonSize, ButtonVariant } from "./button.shared"

interface ButtonGroupProps extends PropsWithChildren<ViewProps> {
  variant?: ButtonVariant
  shape?: "round"
  size?: ButtonSize
  color?: ButtonColor
  block?: boolean
  hairline?: boolean
  disabled?: boolean
}

function ButtonGroup(props: ButtonGroupProps) {
  const { className, variant, shape, size, color, block, hairline, disabled, ...restProps } = props
  return (
    <ButtonGroupContext.Provider
      value={{
        variant,
        size,
        color,
        shape,
        hairline,
        disabled,
      }}
    >
      <View
        className={classNames(
          prefixClassname("button-group"),
          {
            [prefixClassname("button-group--contained")]: variant === "contained",
            [prefixClassname("button-group--text")]: variant === "text",
            [prefixClassname("button-group--outlined")]: variant === "outlined",
            [prefixClassname("button-group--round")]: shape === "round",
            [prefixClassname("button-group--block")]: block,
          },
          className,
        )}
        {...restProps}
      />
    </ButtonGroupContext.Provider>
  )
}

export default ButtonGroup
