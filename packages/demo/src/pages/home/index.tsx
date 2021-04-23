import { Image, Text, View } from "@tarojs/components"
import * as _ from "lodash"
import * as React from "react"
import componentPages from "../../component-pages"

import classes from "./index.module.scss"

import Nav, { NavBlock } from "./nav"

function renderNavs(pages: any[]) {
  return _.map(pages, ({ component, path, title, children }) => {
    if (!children) {
      return <NavBlock key={path} component={component} href={path} title={title} />
    }
    return <Nav key={path} title={title} children={renderNavs(children)} />
  })
}

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
      {renderNavs(componentPages)}
    </View>
  )
}
