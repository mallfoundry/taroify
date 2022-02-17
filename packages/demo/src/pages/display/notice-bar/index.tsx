import { NoticeBar, Swiper, WhiteSpace } from "@taroify/core"
import { ArrowRight, Cross, InfoOutlined, VolumeOutlined } from "@taroify/icons"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicNoticeBar() {
  return (
    <NoticeBar scrollable>
      <NoticeBar.Icon>
        <VolumeOutlined />
      </NoticeBar.Icon>
      在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
    </NoticeBar>
  )
}

function ScrollableNoticeBar() {
  return (
    <>
      <NoticeBar scrollable>技术是开发它的人的共同灵魂。</NoticeBar>
      <WhiteSpace />
      <NoticeBar scrollable={false}>
        在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
      </NoticeBar>
    </>
  )
}

function WordwrapNoticeBar() {
  return (
    <NoticeBar wordwrap scrollable={false}>
      在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
    </NoticeBar>
  )
}

function ActionNoticeBar() {
  return (
    <>
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
    </>
  )
}

function NoticeBarWithCustomStyle() {
  return (
    <NoticeBar style={{ color: "#1989fa", background: "#ecf9ff" }}>
      <NoticeBar.Icon>
        <InfoOutlined />
      </NoticeBar.Icon>
      技术是开发它的人的共同灵魂。
    </NoticeBar>
  )
}

function NoticeBarWithVerticalScrolling() {
  return (
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
  )
}

export default function NoticeBarDemo() {
  return (
    <Page title="NoticeBar 通知栏" className="notice-bar-demo">
      <Block title="基础用法">
        <BasicNoticeBar />
      </Block>
      <Block title="滚动播放">
        <ScrollableNoticeBar />
      </Block>
      <Block title="多行展示">
        <WordwrapNoticeBar />
      </Block>
      <Block title="通知栏模式">
        <ActionNoticeBar />
      </Block>
      <Block title="自定义样式">
        <NoticeBarWithCustomStyle />
      </Block>
      <Block title="自定义样式">
        <NoticeBarWithVerticalScrolling />
      </Block>
    </Page>
  )
}
