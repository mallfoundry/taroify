import { SafeArea } from "@taroify/core"
import { View } from "@tarojs/components"
import Page from "../../../components/page"
import lorem from "../../../utils/lorem"

import "./index.scss"

export default function SafeAreaDemo() {
  return (
    <Page title="SafeArea 安全区域" className="safe-area-demo">
      <SafeArea position="top" />
      <View>{lorem.generateParagraphs(10)}</View>
      <SafeArea position="bottom" />
    </Page>
  )
}
