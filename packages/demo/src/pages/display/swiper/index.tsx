import { Image, Swiper, Toast } from "@taroify/core"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicSwiper() {
  return (
    <Swiper className="basic-swiper" autoplay={4000}>
      <Swiper.Indicator />
      <Swiper.Item>1</Swiper.Item>
      <Swiper.Item>2</Swiper.Item>
      <Swiper.Item>3</Swiper.Item>
      <Swiper.Item>4</Swiper.Item>
    </Swiper>
  )
}

function ImageSwiper() {
  return (
    <Swiper className="image-swiper" lazyRender autoplay={4000}>
      <Swiper.Indicator />
      <Swiper.Item>
        <Image className="image" src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
      </Swiper.Item>
      <Swiper.Item>
        <Image className="image" src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
      </Swiper.Item>
      <Swiper.Item>
        <Image className="image" src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
      </Swiper.Item>
      <Swiper.Item>
        <Image className="image" src="https://img01.yzcdn.cn/vant/apple-4.jpg" />
      </Swiper.Item>
    </Swiper>
  )
}

function SwiperWithOnChange() {
  return (
    <>
      <Toast id="toast" />
      <Swiper
        className="onchange-swiper"
        onChange={(value) => Toast.open(`当前 Swipe 索引：${value}`)}
      >
        <Swiper.Indicator />
        <Swiper.Item>1</Swiper.Item>
        <Swiper.Item>2</Swiper.Item>
        <Swiper.Item>3</Swiper.Item>
        <Swiper.Item>4</Swiper.Item>
      </Swiper>
    </>
  )
}

function SwiperWithCustomWidth() {
  return (
    <Swiper className="basic-swiper" loop={false} width={300}>
      <Swiper.Indicator />
      <Swiper.Item>1</Swiper.Item>
      <Swiper.Item>2</Swiper.Item>
      <Swiper.Item>3</Swiper.Item>
      <Swiper.Item>4</Swiper.Item>
    </Swiper>
  )
}

function VerticalSwiper() {
  return (
    <Swiper className="vertical-swiper" direction="vertical" autoplay={4000}>
      <Swiper.Indicator />
      <Swiper.Item>1</Swiper.Item>
      <Swiper.Item>2</Swiper.Item>
      <Swiper.Item>3</Swiper.Item>
      <Swiper.Item>4</Swiper.Item>
    </Swiper>
  )
}

function SwiperWithCustomIndicator() {
  const [value, setValue] = useState(0)

  return (
    <Swiper className="basic-swiper" onChange={setValue}>
      <Swiper.Item>1</Swiper.Item>
      <Swiper.Item>2</Swiper.Item>
      <Swiper.Item>3</Swiper.Item>
      <Swiper.Item>4</Swiper.Item>
      <Swiper.Indicator className="custom-indicator">{value + 1}/4</Swiper.Indicator>
    </Swiper>
  )
}

export default function SwiperDemo() {
  return (
    <Page title="Swiper 轮播" className="swiper-demo">
      <Block title="基础用法">
        <BasicSwiper />
      </Block>
      <Block title="懒加载">
        <ImageSwiper />
      </Block>
      <Block title="监听 change 事件">
        <SwiperWithOnChange />
      </Block>
      <Block title="纵向滚动">
        <VerticalSwiper />
      </Block>
      <Block title="自定义滑块大小">
        <SwiperWithCustomWidth />
      </Block>
      <Block title="自定义指示器">
        <SwiperWithCustomIndicator />
      </Block>
    </Page>
  )
}
