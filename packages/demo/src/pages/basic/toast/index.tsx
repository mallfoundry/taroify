import { Cell, Image, Loading, Toast } from "@taroify/core"
import { LikeOutlined } from "@taroify/icons"
import Block from "../../../components/block"
import Page from "../../../components/page"

import "./index.scss"

export default function ToastDemo() {
  return (
    <Page title="Toast 轻提示" className="toast-demo">
      <Block variant="card" title="基础用法">
        <Cell
          clickable
          title="文字提示"
          isLink
          onClick={() => Toast.open({ type: "text", message: "文字提示" })}
        />
        <Cell
          clickable
          title="加载提示"
          isLink
          onClick={() => Toast.open({ type: "loading", message: "加载中..." })}
        />
        <Cell
          clickable
          title="成功提示"
          isLink
          onClick={() => Toast.open({ type: "success", message: "成功文案" })}
        />
        <Cell
          clickable
          title="失败提示"
          isLink
          onClick={() => Toast.open({ type: "fail", message: "失败文案" })}
        />
      </Block>
      <Block variant="card" title="自定义图标">
        <Cell
          clickable
          title="自定义图标"
          isLink
          onClick={() => Toast.open({ message: "自定义图标", icon: <LikeOutlined /> })}
        />
        <Cell
          clickable
          title="自定义图片"
          isLink
          onClick={() =>
            Toast.open({
              message: "自定义图片",
              icon: (
                <Image
                  style={{
                    width: "40px",
                    height: "40px",
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
          isLink
          onClick={() => Toast.open({ message: "加载中...", icon: <Loading type="spinner" /> })}
        />
      </Block>
      <Block variant="card" title="自定义位置">
        <Cell
          clickable
          title="顶部展示"
          isLink
          onClick={() =>
            Toast.open({
              position: "top",
              message: "顶部展示",
            })
          }
        />
        <Cell
          clickable
          title="底部展示"
          isLink
          onClick={() =>
            Toast.open({
              position: "bottom",
              message: "底部展示",
            })
          }
        />
      </Block>
    </Page>
  )
}
