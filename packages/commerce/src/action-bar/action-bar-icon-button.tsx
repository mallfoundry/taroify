import { Badge, Button } from "@taroify/core"
import { prefixClassname } from "@taroify/core/styles"
import { View } from "@tarojs/components"
import classnames from "classnames"
import * as React from "react"
import "./action-bar-icon-button.scss"
import { ActionBarIconButtonProps } from "./action-bar.shared"

function ActionBarIconButton(props: ActionBarIconButtonProps) {
  const { badge, icon, text, onClick, style, className } = props
  console.log(badge)
  return (
    <Button
      className={classnames(prefixClassname("action-bar-icon"), className)}
      variant="text"
      style={{ padding: "0px", borderRadius: 0, ...style }}
      onClick={onClick}
    >
      <Badge
        content={badge}
        dot={badge === "dot"}
        className={classnames(prefixClassname("action-bar-icon-view"))}
      >
        <View>{icon}</View>
        <View>{text}</View>
      </Badge>
    </Button>
  )
}

ActionBarIconButton.displayName = "ActionBarIcon"
export default ActionBarIconButton
