import { View } from "@tarojs/components"
import classnames from "classnames"
import * as React from "react"

import { prefixClassname } from "../styles"
import "./action-bar.scss"

function ActionBar(props: any) {
  return <View className={classnames(prefixClassname("action-bar"))}>{props.children}</View>
}

export default ActionBar
