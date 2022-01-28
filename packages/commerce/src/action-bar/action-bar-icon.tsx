import { Button } from "@taroify/core"
import { prefixClassname } from "@taroify/core/styles"
import { View } from "@tarojs/components"
import classnames from "classnames"
import * as React from "react"
import { ReactElement, ReactText } from "react"
import "./action-bar-icon.scss"

interface ActionBarIconBadge {
  content?: number
  dot?: boolean
}

export interface ActionBarIconProps {
  icon?: ReactText | ReactElement
  text?: string
  badge?: ActionBarIconBadge
}

function ActionBarIcon(props: ActionBarIconProps) {
  const { icon, text } = props

  return (
    <Button variant="text" style={{ padding: "0px" }} onClick={() => console.log(1)}>
      <View className={classnames(prefixClassname("action-bar-icon"))}>
        <View>{icon}</View>
        <View>{text}</View>
      </View>
    </Button>
  )
}

ActionBarIcon.displayName = "ActionBarIcon"
export default ActionBarIcon
