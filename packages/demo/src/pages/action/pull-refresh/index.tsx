import { Image, PullRefresh, Tabs } from "@taroify/core"
import { View } from "@tarojs/components"
import * as React from "react"
import { useRef, useState } from "react"
import Page from "../../../components/page"
import "./index.scss"

function BasicPullRefresh() {
  const [loading, setLoading] = useState(false)
  const counterRef = useRef(0)
  return (
    <PullRefresh
      loading={loading}
      onRefresh={() => {
        setLoading(true)
        setTimeout(() => {
          counterRef.current += 1
          setLoading(false)
        }, 1000)
      }}
    >
      <View className="pull-text">
        {counterRef.current ? "刷新次数：" + counterRef.current : "下拉试试"}
      </View>
    </PullRefresh>
  )
}

function CompletedPullRefresh() {
  const [loading, setLoading] = useState(false)
  const counterRef = useRef(0)
  return (
    <PullRefresh
      loading={loading}
      onRefresh={() => {
        setLoading(true)
        setTimeout(() => {
          counterRef.current += 1
          setLoading(false)
        }, 1000)
      }}
    >
      <PullRefresh.Completed>刷新成功</PullRefresh.Completed>
      <View className="pull-text">
        {counterRef.current ? "刷新次数：" + counterRef.current : "下拉试试"}
      </View>
    </PullRefresh>
  )
}

function CustomPullRefresh() {
  const [loading, setLoading] = useState(false)
  const counterRef = useRef(0)
  return (
    <PullRefresh
      loading={loading}
      headHeight={80}
      onRefresh={() => {
        setLoading(true)
        setTimeout(() => {
          counterRef.current += 1
          setLoading(false)
        }, 1000)
      }}
    >
      <PullRefresh.Pulling>
        {({ distance = 0 }) => (
          <Image
            className="doge"
            style={{ transform: `scale(${distance / 80})` }}
            src="https://img.yzcdn.cn/vant/doge.png"
          />
        )}
      </PullRefresh.Pulling>
      <PullRefresh.Loosing>
        <Image className="doge" src="https://img.yzcdn.cn/vant/doge.png" />
      </PullRefresh.Loosing>
      <PullRefresh.Loading>
        <Image className="doge" src="https://img.yzcdn.cn/vant/doge-fire.jpg" />
      </PullRefresh.Loading>
      <View className="pull-text">
        {counterRef.current ? "刷新次数：" + counterRef.current : "下拉试试"}
      </View>
    </PullRefresh>
  )
}

export default function PullRefreshDemo() {
  const [activeTab, setActiveTab] = useState<Tabs.TabKey>(0)
  return (
    <Page title="PullRefresh 下拉刷新" className="pull-refresh-demo">
      <Tabs activeKey={activeTab} onChange={({ key }) => setActiveTab(key)}>
        <Tabs.TabPane title="基本用法">
          <BasicPullRefresh />
        </Tabs.TabPane>
        <Tabs.TabPane title="完成提示">
          <CompletedPullRefresh />
        </Tabs.TabPane>
        <Tabs.TabPane title="自定义提示">
          <CustomPullRefresh />
        </Tabs.TabPane>
      </Tabs>
    </Page>
  )
}
