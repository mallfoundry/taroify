import { Image, Text, View } from "@tarojs/components"
import * as _ from "lodash"
import { demoPrefixClassname } from "../../styles/prefix"
import subpackages, { Page } from "../../subpackages"
import "./index.scss"

import Nav, { NavBlock } from "./nav"

function renderNavBlocks(root: string, pages: Page[]) {
  return _.map(pages, ({ name, path, title }) => (
    <NavBlock key={title} component={name} href={"/" + root + "/" + path} title={title} />
  ))
}

function renderNavs() {
  return _.map(subpackages, ({ root, title, pages }) => (
    <Nav key={root} title={title} children={renderNavBlocks(root, pages)} />
  ))
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
      {renderNavs()}
    </View>
  )
}
