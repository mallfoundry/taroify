import { View } from "@tarojs/components"
import { Avatar } from "@taroify/core"
import * as React from "react"
import "./index.scss"

function Index() {
  return <View>
    <View>测试 Image 组件下影响的 Avatar 情况</View>
    <Avatar src="https://joesch.moe/api/v1/random"></Avatar>
  </View>
}

export default Index
