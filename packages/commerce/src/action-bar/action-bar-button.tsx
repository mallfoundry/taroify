import { Button } from "@taroify/core"
import { prefixClassname } from "@taroify/core/styles"
import classnames from "classnames"
import * as React from "react"
import { useContext, useMemo } from "react"
import { ActionBarContext } from "./action-bar.context"
import { ActionBarButtonProps } from "./action-bar.shared"

function ActionBarButton(props: ActionBarButtonProps) {
  const {
    loading,
    icon,
    index = 0,
    onClick,
    style,
    disabled,
    text,
    type = "danger",
    className,
  } = props
  const { parent } = useContext(ActionBarContext)
  const isFirst = useMemo(() => {
    return parent[index - 1] !== "ActionBarButton"
  }, [index, parent])

  const isLast = useMemo(() => {
    return parent[index + 1] !== "ActionBarButton"
  }, [index, parent])
  return (
    <Button
      block
      onClick={onClick}
      style={{ border: "none", ...style }}
      loading={loading}
      disabled={disabled}
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
      {text}
    </Button>
  )
}

ActionBarButton.displayName = "ActionBarButton"
export default ActionBarButton
