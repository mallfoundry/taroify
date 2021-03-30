import { Image, Text, View } from "@tarojs/components"
import classes from "./index.module.scss"
import Nav, { NavBlock } from "./nav"

export default function Home() {
  return (
    <View className={classes.Home}>
      <View className={classes.HomeTitle}>
        <Image className={classes.HomeLogo} mode="aspectFit" src="https://img01.yzcdn.cn/vant/logo.png" />
        <Text className={classes.HomeName}>Vant Taro</Text>
      </View>
      <View className={classes.HomeDescription}>轻量、可靠的小程序端 Taro 组件库</View>
      <Nav title="基础组件">
        <NavBlock href="/pages/button/index" title="Button 按钮" />
        <NavBlock href="/pages/cell/index" title="Cell 单元格" />
        <NavBlock href="/pages/icon/index" title="Icon 图标" />
        <NavBlock href="/pages/image/index" title="Image 图片" />
        <NavBlock href="/pages/layout/index" title="Layout 布局" />
        <NavBlock href="/pages/backdrop/index" title="Backdrop 背景暗化" />
        <NavBlock href="/pages/popup/index" title="Popup 弹出层" />
        <NavBlock href="/pages/button/index" title="Style 内置样式" />
        <NavBlock href="/pages/transition/index" title="Transition 动画" />
        <NavBlock href="/pages/toast/index" title="Toast 轻提示" />
        <NavBlock href="/pages/loading/index" title="Loading 加载" />
      </Nav>
    </View>
  )
}
