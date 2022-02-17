import { Button, ConfigProvider, Field, Rate, Slider } from "@taroify/core"
import { View } from "@tarojs/components"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function ConfigProviderDemo() {
  const [rate, setRate] = useState(4)
  const [slider, setSlider] = useState(50)

  return (
    <Page className="config-provider-demo" title="ConfigProvider 全局配置">
      <Block title="默认主题">
        <Field label="评分">
          <Rate allowHalf value={rate} onChange={setRate} />
        </Field>
        <Field label="滑块">
          <Slider value={slider} onChange={setSlider} />
        </Field>
        <View style={{ margin: "16px" }}>
          <Button shape="round" block color="primary">
            提交
          </Button>
        </View>
      </Block>
      <Block title="定制主题">
        <ConfigProvider
          theme={{
            rateIconFullColor: "#07c160",
            sliderTrackHeight: "4px",
            sliderButtonWidth: "20px",
            sliderButtonHeight: "20px",
            sliderActiveBackgroundColor: "#07c160",
            buttonPrimaryBorderColor: "#07c160",
            buttonPrimaryBackgroundColor: "#07c160",
          }}
        >
          <Field label="评分">
            <Rate allowHalf value={rate} onChange={setRate} />
          </Field>
          <Field label="滑块">
            <Slider value={slider} onChange={setSlider} />
          </Field>
          <View style={{ margin: "16px" }}>
            <Button shape="round" block color="primary">
              提交
            </Button>
          </View>
        </ConfigProvider>
      </Block>
    </Page>
  )
}
