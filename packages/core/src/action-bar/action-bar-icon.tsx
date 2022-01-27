import { View } from "@tarojs/components"
import classnames from "classnames"
import * as React from "react"
import { ReactElement, ReactText } from "react"
import Button from "../button"
import { prefixClassname } from "../styles"
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
