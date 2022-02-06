import Button, { ButtonProps } from "@taroify/core/button"
import { prefixClassname } from "@taroify/core/styles"
import classnames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import { ActionBarButtonColor, ActionBarButtonShape } from "./action-bar.shared"

export interface ActionBarButtonProps extends Omit<ButtonProps, "shape" | "color" | "block"> {
  className?: string
  style?: CSSProperties
  color?: ActionBarButtonColor
  shape?: ActionBarButtonShape
  children?: ReactNode
}

function ActionBarButton(props: ActionBarButtonProps) {
  const { className, color = "danger", ...restProps } = props

  return (
    <Button
      block
      className={classnames(
        prefixClassname("action-bar-button"),
        {
          [prefixClassname("action-bar-button--danger")]: color === "danger",
          [prefixClassname("action-bar-button--warning")]: color === "warning",
        },
        className,
      )}
      {...restProps}
    />
  )
}

export default ActionBarButton
