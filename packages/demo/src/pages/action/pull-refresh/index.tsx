import { Image, PullRefresh, Tabs } from "@taroify/core"
import { View } from "@tarojs/components"
import { usePageScroll } from "@tarojs/taro"
import { useState } from "react"
import CustomWrapper from "../../../components/custom-wrapper"
import Page from "../../../components/page"
import "./index.scss"

function BasicPullRefresh() {
  const [loading, setLoading] = useState(false)
  const [counter, setCounter] = useState(0)
  const [reachTop, setReachTop] = useState(true)

  usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))

  return (
    <PullRefresh
      loading={loading}
      reachTop={reachTop}
      onRefresh={() => {
        setLoading(true)
        setTimeout(() => {
          setCounter(counter + 1)
          setLoading(false)
        }, 1000)
      }}
    >
      <View className="pull-text">{counter ? "刷新次数：" + counter : "下拉试试"}</View>
    </PullRefresh>
  )
}

function CompletedPullRefresh() {
  const [loading, setLoading] = useState(false)
  const [counter, setCounter] = useState(0)
  const [reachTop, setReachTop] = useState(true)

  usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))

  return (
    <PullRefresh
      loading={loading}
      reachTop={reachTop}
      onRefresh={() => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          setCounter(counter + 1)
        }, 1000)
      }}
    >
      <PullRefresh.Completed>刷新成功</PullRefresh.Completed>
      <View className="pull-text">{counter ? "刷新次数：" + counter : "下拉试试"}</View>
    </PullRefresh>
  )
}

function CustomPullRefresh() {
  const [loading, setLoading] = useState(false)
  const [counter, setCounter] = useState(0)
  const [reachTop, setReachTop] = useState(true)

  usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))

  return (
    <PullRefresh
      loading={loading}
      headHeight={80}
      reachTop={reachTop}
      onRefresh={() => {
        setLoading(true)
        setTimeout(() => {
          setCounter(counter + 1)
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
      <View className="pull-text">{counter ? "刷新次数：" + counter : "下拉试试"}</View>
    </PullRefresh>
  )
}

export default function PullRefreshDemo() {
  const [tab, setTab] = useState(0)
  return (
    <Page title="PullRefresh 下拉刷新" className="pull-refresh-demo">
      <Tabs value={tab} onChange={setTab}>
        <Tabs.TabPane title="基本用法">
          <CustomWrapper>
            <BasicPullRefresh />
          </CustomWrapper>
        </Tabs.TabPane>
        <Tabs.TabPane title="完成提示">
          <CustomWrapper>
            <CompletedPullRefresh />
          </CustomWrapper>
        </Tabs.TabPane>
        <Tabs.TabPane title="自定义提示">
          <CustomWrapper>
            <CustomPullRefresh />
          </CustomWrapper>
        </Tabs.TabPane>
      </Tabs>
    </Page>
  )
}
