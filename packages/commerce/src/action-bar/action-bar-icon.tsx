import { Button } from "@taroify/core"
import { prefixClassname } from "@taroify/core/styles"
import { View } from "@tarojs/components"
import classnames from "classnames"
import * as React from "react"
import "./action-bar-icon.scss"
import { ActionBarIconProps } from "./action-bar.shared"

function ActionBarIcon(props: ActionBarIconProps) {
  const { icon, text, onClick, style, className } = props
  return (
    <Button
      className={classnames(prefixClassname("action-bar-icon"), className)}
      variant="text"
      style={{ padding: "0px", borderRadius: 0, ...style }}
      onClick={onClick}
    >
      <View className={classnames(prefixClassname("action-bar-icon-view"))}>
        <View>{icon}</View>
        <View>{text}</View>
      </View>
    </Button>
  )
}

ActionBarIcon.displayName = "ActionBarIcon"
export default ActionBarIcon
