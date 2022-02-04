import { Button } from "@taroify/core"
import { prefixClassname } from "@taroify/core/styles"
import { LoadingProps } from "@taroify/~core/src/loading"
import { ITouchEvent } from "@tarojs/components/types/common"
import classnames from "classnames"
import * as React from "react"
import { CSSProperties, ReactElement, ReactText, useContext, useMemo } from "react"
import { ActionBarContext } from "./action-bar.context"
import { ActionBarButtonType, ActionBarSquare } from "./action-bar.shared"

export interface ActionBarButtonProps {
  type?: ActionBarButtonType
  text?: string
  style?: CSSProperties | any
  className?: string
  index?: number
  onClick?: (event: ITouchEvent) => void
  disabled?: boolean
  loading?: boolean | LoadingProps
  icon?: ReactText | ReactElement
  children?: ReactText | ReactElement
  shape?: ActionBarSquare
}

function ActionBarButton(props: ActionBarButtonProps) {
  const {
    loading,
    icon,
    index = 0,
    onClick,
    style,
    disabled,
    type = "danger",
    className,
    children,
    shape,
  } = props
  const { parent } = useContext(ActionBarContext)
  const isFirst = useMemo(() => {
    if (shape === "border-round" || shape === undefined) {
      return parent[index - 1] !== "ActionBarButton"
    }
    return false
  }, [index, parent])

  const isLast = useMemo(() => {
    if (shape === "border-round" || shape === undefined) {
      return parent[index + 1] !== "ActionBarButton"
    }
    return false
  }, [index, parent])
  const isShape = useMemo(() => {
    return shape == "border-round" ? "square" : shape
  }, [shape])

  return (
    <Button
      block
      onClick={onClick}
      style={{ border: "none", ...style }}
      loading={loading}
      disabled={disabled}
      shape={isShape}
      icon={icon}
      className={classnames(
        prefixClassname("action-bar-button"),
        {
          [prefixClassname("action-bar-button--danger")]: type === "danger",
          [prefixClassname("action-bar-button--warning")]: type === "warning",
        },
        {
          [prefixClassname("action-bar-button--last")]: isLast,
          [prefixClassname("action-bar-button--first")]: isFirst,
        },

        className,
      )}
    >
      {children}
    </Button>
  )
}

ActionBarButton.displayName = "ActionBarButton"
export default ActionBarButton
