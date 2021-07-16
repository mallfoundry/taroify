import { NoticeBar, Swiper, WhiteSpace } from "@taroify/core"
import { ArrowRight, Cross, InfoOutlined, VolumeOutlined } from "@taroify/icons"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicNoticeBar() {
  return (
    <Block title="基础用法">
      <NoticeBar scrollable>
        <NoticeBar.Icon>
          <VolumeOutlined />
        </NoticeBar.Icon>
        在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
      </NoticeBar>
    </Block>
  )
}

function ScrollableNoticeBar() {
  return (
    <Block title="滚动播放">
      <NoticeBar scrollable>技术是开发它的人的共同灵魂。</NoticeBar>
      <WhiteSpace />
      <NoticeBar scrollable={false}>
        在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
      </NoticeBar>
    </Block>
  )
}

function WordwrapNoticeBar() {
  return (
    <Block title="多行展示">
      <NoticeBar wordwrap scrollable={false}>
        在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
      </NoticeBar>
    </Block>
  )
}

function ActionNoticeBar() {
  return (
    <Block title="通知栏模式">
      <NoticeBar scrollable={false}>
        技术是开发它的人的共同灵魂。
        <NoticeBar.Action>
          <Cross />
        </NoticeBar.Action>
      </NoticeBar>
      <WhiteSpace />
      <NoticeBar scrollable={false}>
        技术是开发它的人的共同灵魂。
        <NoticeBar.Action>
          <ArrowRight />
        </NoticeBar.Action>
      </NoticeBar>
    </Block>
  )
}

function NoticeBarWithCustomStyle() {
  return (
    <Block title="自定义样式">
      <NoticeBar style={{ color: "#1989fa", background: "#ecf9ff" }}>
        <NoticeBar.Icon>
          <InfoOutlined />
        </NoticeBar.Icon>
        技术是开发它的人的共同灵魂。
      </NoticeBar>
    </Block>
  )
}

function NoticeBarWithVerticalScrolling() {
  return (
    <Block title="自定义样式">
      <NoticeBar>
        <NoticeBar.Icon>
          <VolumeOutlined />
        </NoticeBar.Icon>
        <Swiper className="notice-swiper" direction="vertical" autoplay={3000}>
          <Swiper.Item>内容 1</Swiper.Item>
          <Swiper.Item>内容 2</Swiper.Item>
          <Swiper.Item>内容 3</Swiper.Item>
        </Swiper>
      </NoticeBar>
    </Block>
  )
}

export default function NoticeBarDemo() {
  return (
    <Page title="NoticeBar 通知栏" className="notice-bar-demo">
      <BasicNoticeBar />
      <ScrollableNoticeBar />
      <WordwrapNoticeBar />
      <ActionNoticeBar />
      <NoticeBarWithCustomStyle />
      <NoticeBarWithVerticalScrolling />
    </Page>
  )
}
