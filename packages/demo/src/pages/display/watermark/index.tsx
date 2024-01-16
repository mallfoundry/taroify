import { useState } from "react"
import { Watermark, Button } from "@taroify/core"
import { View } from "@tarojs/components"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function WatermarkFullPageDemo() {
  const [fullPage, setFullPage] = useState(false)
  return <>
    <Button color="primary" onClick={() => setFullPage(prev => !prev)}>切换</Button>
    <Watermark
      image="https://fastly.jsdelivr.net/npm/@vant/assets/vant-watermark.png"
      opacity={0.2}
      fullPage={fullPage}
    />
  </>
}

export default function WatermarkDemo() {
  return (
    <Page title="Watermark 水印" className="watermark-demo">
      <Block variant="card" title="文字水印">
        <View className="watermark-demo-wrapper">
          <Watermark content="taroify" />
        </View>
      </Block>
      <Block variant="card" title="图片水印">
        <View className="watermark-demo-wrapper">
        <Watermark
          image="https://fastly.jsdelivr.net/npm/@vant/assets/vant-watermark.png"
          opacity={0.2}
        />
        </View>
      </Block>
      <Block variant="card" title="自定义间隔">
        <View className="watermark-demo-wrapper">
        <Watermark
          image="https://fastly.jsdelivr.net/npm/@vant/assets/vant-watermark.png"
          gapX={50}
          gapY={50}
          opacity={0.2}
        />
        </View>
      </Block>
      <Block variant="card" title="自定义倾斜角度">
        <View className="watermark-demo-wrapper">
        <Watermark
          image="https://fastly.jsdelivr.net/npm/@vant/assets/vant-watermark.png"
          rotate={22}
          opacity={0.2}
        />
        </View>
      </Block>
      <Block variant="card" title="显示范围">
        <View className="watermark-demo-wrapper">
          <WatermarkFullPageDemo />
        </View>
      </Block>
    </Page>
  )
}
