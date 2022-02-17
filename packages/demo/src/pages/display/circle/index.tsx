import { Button, Circle, Space } from "@taroify/core"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

interface PercentProps {
  percent?: number
}

function BasicCircle({ percent }: PercentProps) {
  const [currentPercent, setCurrentPercent] = useState(0)

  return (
    <Circle percent={percent} onChange={setCurrentPercent}>
      {currentPercent.toFixed(0)}%
    </Circle>
  )
}

function CustomCircle({ percent }: PercentProps) {
  return (
    <Space>
      <Circle percent={percent} strokeWidth={60}>
        宽度定制
      </Circle>
      <Circle percent={percent} color="#ee0a24" layerColor="#ebedf0">
        颜色定制
      </Circle>
      <Circle
        percent={percent}
        color={{
          "0%": "#3fecff",
          "100%": "#6149f6",
        }}
      >
        渐变色
      </Circle>
      <Circle percent={percent} clockwise={false} color="#07c160">
        逆时针方向
      </Circle>
      <Circle percent={percent} size={120} color="#7232dd">
        大小定制
      </Circle>
    </Space>
  )
}

export default function CircleDemo() {
  const [percent, setPercent] = useState(70)

  return (
    <Page title="Circle 环形进度条" className="circle-demo">
      <Block title="基础用法">
        <BasicCircle percent={percent} />
      </Block>
      <Block title="样式定制">
        <CustomCircle percent={percent} />
      </Block>
      <Block>
        <Space>
          <Button
            color="primary"
            size="small"
            onClick={() => setPercent((prevPercent) => Math.min(prevPercent + 20, 100))}
          >
            增加
          </Button>
          <Button
            color="danger"
            size="small"
            onClick={() => setPercent((prevPercent) => Math.max(prevPercent - 20, 0))}
          >
            减少
          </Button>
        </Space>
      </Block>
    </Page>
  )
}
