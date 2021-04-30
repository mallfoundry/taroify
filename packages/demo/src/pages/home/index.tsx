import { Image, Text, View } from "@tarojs/components"
import * as _ from "lodash"
import * as React from "react"
import componentPages from "../../component-pages"
import "./index.scss"
import { demoPrefixClassname } from "../../styles/prefix"

import Nav, { NavBlock } from "./nav"

function renderNavs(pages: any[]) {
  return _.map(pages, ({ name, path, title, children }) => {
    if (!children) {
      return <NavBlock key={title} component={name} href={path} title={title} />
    }
    return <Nav key={title} title={title} children={renderNavs(children)} />
  })
}

export default function Home() {
  return (
    <View className={demoPrefixClassname("home")}>
      <View className={demoPrefixClassname("home__title")}>
        <Image
          className={demoPrefixClassname("home__logo")}
          mode="aspectFit"
          src="https://img01.yzcdn.cn/vant/logo.png"
        />
        <Text className={demoPrefixClassname("home__name")}>Taroify</Text>
      </View>
      <View className={demoPrefixClassname("home__description")}>
        轻量、可靠的小程序端 Taro 组件库
      </View>
      {renderNavs(componentPages)}
    </View>
  )
}
