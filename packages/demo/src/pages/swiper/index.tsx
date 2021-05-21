import { Swiper } from "@taroify/core"
import * as React from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import "./index.scss"

function BasicSwiper() {
  return (
    <Block title="基础用法">
      <Swiper className="basic-swiper">
        <Swiper.Item>1</Swiper.Item>
        <Swiper.Item>2</Swiper.Item>
        <Swiper.Item>3</Swiper.Item>
        <Swiper.Item>4</Swiper.Item>
      </Swiper>
    </Block>
  )
}

function VerticalSwiper() {
  return (
    <Block title="纵向滚动">
      <Swiper className="vertical-swiper" direction="vertical">
        <Swiper.Item>1</Swiper.Item>
        <Swiper.Item>2</Swiper.Item>
        <Swiper.Item>3</Swiper.Item>
        <Swiper.Item>4</Swiper.Item>
      </Swiper>
    </Block>
  )
}

export default function SwiperDemo() {
  return (
    <Page title="Swiper 轮播" className="swiper-demo">
      <BasicSwiper />
      <VerticalSwiper />
    </Page>
  )
}
