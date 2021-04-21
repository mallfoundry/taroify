import { Image, Text, View } from "@tarojs/components"
import * as React from "react"
import classes from "./index.module.scss"
import Nav, { NavBlock } from "./nav"

export default function Home() {
  return (
    <View className={classes.Home}>
      <View className={classes.HomeTitle}>
        <Image
          className={classes.HomeLogo}
          mode="aspectFit"
          src="https://img01.yzcdn.cn/vant/logo.png"
        />
        <Text className={classes.HomeName}>Taroify</Text>
      </View>
      <View className={classes.HomeDescription}>轻量、可靠的小程序端 Taro 组件库</View>
      <Nav title="基础组件">
        <NavBlock component="Button" href="/pages/button/index" title="Button 按钮" />
        <NavBlock component="Cell" href="/pages/cell/index" title="Cell 单元格" />
        <NavBlock component="Icon" href="/pages/icon/index" title="Icon 图标" />
        <NavBlock component="Image" href="/pages/image/index" title="Image 图片" />
        <NavBlock component="Layout" href="/pages/layout/index" title="Layout 布局" />
        <NavBlock component="Popup" href="/pages/popup/index" title="Popup 弹出层" />
        <NavBlock component="Style" href="/pages/style/index" title="Style 内置样式" />
        <NavBlock component="Toast" href="/pages/toast/index" title="Toast 轻提示" />
        <NavBlock component="Space" href="/pages/space/index" title="Space 间距" />
      </Nav>
      <Nav title="反馈组件">
        <NavBlock component="Loading" href="/pages/loading/index" title="Loading 加载" />
        <NavBlock component="Backdrop" href="/pages/backdrop/index" title="Backdrop 背景暗化" />
      </Nav>
    </View>
  )
}
