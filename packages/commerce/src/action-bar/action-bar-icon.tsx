import Button from "@taroify/~core/src/button"
import { prefixClassname } from "@taroify/~core/src/styles"
import { View } from "@tarojs/components"
import classnames from "classnames"
import * as React from "react"
import { ReactElement, ReactText } from "react"
import "./action-bar-icon.scss"

interface ActionBarIconBadge {
  content?: number
  dot?: boolean
}

interface ActionBarIconProps {
  icon?: ReactText | ReactElement
  text?: string
  badge?: ActionBarIconBadge
}

function ActionBarIcon(props: ActionBarIconProps) {
  const { icon, text } = props
  return (
    <Button
      className={classnames(prefixClassname("action-bar-icon"))}
      variant="text"
      onClick={() => console.log(1)}
    >
      <View>{icon}</View>
      <View>{text}</View>
    </Button>
  )
}

export default ActionBarIcon
