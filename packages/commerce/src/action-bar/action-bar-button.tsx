import { Button } from "@taroify/core"
import { prefixClassname } from "@taroify/core/styles"
import classnames from "classnames"
import * as React from "react"

export type ActionBarButtonType = "primary" | "info" | "warning" | "danger"

export interface ActionBarButtonProps {
  type?: ActionBarButtonType
  text?: string
  style?: string
  className?: string
}

function ActionBarButton(props: ActionBarButtonProps) {
  const { text, type = "danger", className } = props
  return (
    <Button
      block
      className={classnames(
        prefixClassname("action-bar-button"),
        {
          [prefixClassname("action-bar-button--danger")]: type === "danger",
          [prefixClassname("action-bar-button--warning")]: type === "warning",
        },
        
        prefixClassname("action-bar-button--first"),
        className,
      )}
    >
      {text}
    </Button>
  )
}

ActionBarButton.displayName = "ActionBarButton"
export default ActionBarButton
