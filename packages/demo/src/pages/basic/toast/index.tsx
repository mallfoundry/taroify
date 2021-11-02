import { Cell, Image, Loading, Toast } from "@taroify/core"
import { ToastOptions } from "@taroify/core/toast"
import { ArrowRight, LikeOutlined } from "@taroify/icons"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"

import "./index.scss"

export default function ToastDemo() {
  function handleOpen({ type, position, message, icon }: ToastOptions) {
    Toast.open({
      type,
      position,
      message,
      icon,
    })
  }

  return (
    <Page title="Toast 轻提示" className="toast-demo">
      <Block title="基础用法">
        <Cell
          clickable
          title="文字提示"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ type: "text", message: "文字提示" })}
        />
        <Cell
          clickable
          title="加载提示"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ type: "loading", message: "加载中..." })}
        />
        <Cell
          clickable
          title="成功提示"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ type: "success", message: "成功文案" })}
        />
        <Cell
          clickable
          title="失败提示"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ type: "fail", message: "失败文案" })}
        />
      </Block>
      <Block title="自定义图标">
        <Cell
          clickable
          title="自定义图标"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ message: "自定义图标", icon: <LikeOutlined /> })}
        />
        <Cell
          clickable
          title="自定义图片"
          rightIcon={<ArrowRight />}
          onClick={() =>
            handleOpen({
              message: "自定义图片",
              icon: (
                <Image
                  style={{
                    width: "1em",
                    height: "1em",
                  }}
                  src="https://img01.yzcdn.cn/vant/logo.png"
                />
              ),
            })
          }
        />
        <Cell
          clickable
          title="自定义加载图标"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ message: "加载中...", icon: <Loading type="spinner" /> })}
        />
      </Block>
      <Block title="自定义位置">
        <Cell
          clickable
          title="顶部展示"
          rightIcon={<ArrowRight />}
          onClick={() =>
            handleOpen({
              position: "top",
              message: "顶部展示",
            })
          }
        />
        <Cell
          clickable
          title="底部展示"
          rightIcon={<ArrowRight />}
          onClick={() =>
            handleOpen({
              position: "bottom",
              message: "底部展示",
            })
          }
        />
      </Block>
    </Page>
  )
}
