import { Rate } from "@taroify/core"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function RateDemo() {
  const [value, setValue] = useState(3.7)
  return (
    <Page title="Rate 评分" className="switch-demo">
      <Block title="自定义大小">
        <Rate allowHalf value={value} onChange={setValue} />
      </Block>
    </Page>
  )
}
