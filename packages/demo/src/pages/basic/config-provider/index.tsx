import {
  Button,
  Cell,
  ConfigProvider,
  type ConfigProviderTheme,
  type ConfigProviderThemeVars,
  Field,
  Rate,
  Slider,
  Switch,
} from "@taroify/core"
import { View } from "@tarojs/components"
import { ENV_TYPE, getEnv, getSystemInfoSync, offThemeChange, onThemeChange } from "@tarojs/taro"
import { useEffect, useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

const themeVars: ConfigProviderThemeVars = {
  rateIconFullColor: "#07c160",
  sliderTrackHeight: "4px",
  sliderActiveBackgroundColor: "#07c160",
  buttonPrimaryBorderColor: "#07c160",
  buttonPrimaryBackgroundColor: "#07c160",
}

export default function ConfigProviderDemo() {
  const [rate, setRate] = useState(4)
  const [slider, setSlider] = useState(50)
  const [themeMode, setThemeMode] = useState<ConfigProviderTheme>(() => {
    if (getEnv() === ENV_TYPE.WEAPP) {
      return getSystemInfoSync().theme === "dark" ? "dark" : "light"
    }
    return "light"
  })

  useEffect(() => {
    if (getEnv() !== ENV_TYPE.WEAPP) return

    const listener = ({ theme }: { theme: ConfigProviderTheme }) => setThemeMode(theme)
    onThemeChange(listener)
    return () => offThemeChange(listener)
  }, [])

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
        <ConfigProvider theme={themeVars}>
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
      <Block title="暗色模式">
        <ConfigProvider themeMode={themeMode}>
          <View className="config-provider-demo__theme">
            <Cell
              title="暗色模式"
              rightIcon={
                <Switch
                  size={24}
                  checked={themeMode === "dark"}
                  onChange={(checked) => setThemeMode(checked ? "dark" : "light")}
                />
              }
            />
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
          </View>
        </ConfigProvider>
      </Block>
    </Page>
  )
}
