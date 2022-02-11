import Button, { ButtonProps } from "@taroify/core/button"
import { prefixClassname } from "@taroify/core/styles"
import classnames from "classnames"
import * as React from "react"
import { CSSProperties, PropsWithChildren } from "react"
import { ActionBarButtonColor, ActionBarButtonShape } from "./action-bar.shared"

export interface ActionBarButtonProps
  extends PropsWithChildren<Omit<ButtonProps, "shape" | "color" | "block">> {
  className?: string
  style?: CSSProperties
  color?: ActionBarButtonColor
  shape?: ActionBarButtonShape
}

function ActionBarButton(props: ActionBarButtonProps) {
  const { className, shape = "round", color = "danger", ...restProps } = props

  return (
    <Button
      className={classnames(
        prefixClassname("action-bar-button"),
        {
          [prefixClassname("action-bar-button--danger")]: color === "danger",
          [prefixClassname("action-bar-button--warning")]: color === "warning",
        },
        className,
      )}
      block
      color={color}
      shape={shape}
      {...restProps}
    />
  )
}

export default ActionBarButton
