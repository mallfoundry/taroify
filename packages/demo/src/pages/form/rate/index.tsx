import { Rate } from "@taroify/core"
import { Like, LikeOutlined, Star } from "@taroify/icons"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicRate() {
  const [value, setValue] = useState(3)
  return <Rate value={value} onChange={setValue} />
}

function CustomIconRate() {
  const [value, setValue] = useState(3)
  return <Rate icon={<Like />} emptyIcon={<LikeOutlined />} value={value} onChange={setValue} />
}

function CustomStyledRate() {
  const [value, setValue] = useState(3)
  return (
    <Rate
      size={25}
      color="#ffd21e"
      emptyColor="#eee"
      emptyIcon={<Star />}
      value={value}
      onChange={setValue}
    />
  )
}

function HalfRate() {
  const [value, setValue] = useState(3)
  return <Rate allowHalf value={value} onChange={setValue} />
}

function Count6Rate() {
  const [value, setValue] = useState(3)
  return <Rate count={6} value={value} onChange={setValue} />
}

function DisabledRate() {
  const [value, setValue] = useState(3)
  return <Rate disabled value={value} onChange={setValue} />
}

function ReadonlyRate() {
  const [value, setValue] = useState(3)
  return <Rate readonly value={value} onChange={setValue} />
}

function ReadonlyHalfRate() {
  const [value, setValue] = useState(3.3)
  return <Rate readonly allowHalf value={value} onChange={setValue} />
}

export default function RateDemo() {
  return (
    <Page title="Rate 评分" className="switch-demo">
      <Block title="基础用法">
        <BasicRate />
      </Block>
      <Block title="自定义图标">
        <CustomIconRate />
      </Block>
      <Block title="自定义样式">
        <CustomStyledRate />
      </Block>
      <Block title="半星">
        <HalfRate />
      </Block>
      <Block title="自定义数量">
        <Count6Rate />
      </Block>
      <Block title="禁用状态">
        <DisabledRate />
      </Block>
      <Block title="只读状态">
        <ReadonlyRate />
      </Block>
      <Block title="只读状态显示小数">
        <ReadonlyHalfRate />
      </Block>
    </Page>
  )
}
