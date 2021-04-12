import * as React from "react"
import { CSSProperties, useState } from "react"
import Cell from "@taroify/core/cell"
import Popup, { PopupPlacement } from "@taroify/core/popup"
import ArrowRight from "@taroify/icons/ArrowRight"
import Page from "../../components/page"
import Block from "../../components/block"

interface OpenOptions {
  open?: boolean,
  closeable?: boolean
  style?: CSSProperties
  placement?: PopupPlacement
  rounded?: boolean
}

export default function PopupDemo() {
  const [options, setOptions] = useState<OpenOptions>({})

  function handleOpen({ placement, rounded, closeable }: OpenOptions) {
    const openOptions: OpenOptions = {
      open: true,
      placement,
      rounded,
      closeable
    }
    if (placement === PopupPlacement.Left || placement === PopupPlacement.Right) {
      openOptions.style = {
        height: "20%",
        width: "20%",
      }
    } else if (placement) {
      openOptions.style = { height: "30%" }

    } else {
      openOptions.style = { padding: "30px 50px" }
    }
    setOptions({
      ...options,
      ...openOptions,
    })
  }

  return (
    <Page title="Popup">
      <Block title="基础用法">
        <Cell clickable label="显示遮盖层"
              endIcon={<ArrowRight />}
              onClick={() => handleOpen({ placement: undefined })}
        />
      </Block>
      <Block title="弹出位置">
        <Cell clickable label="顶部弹出"
              endIcon={<ArrowRight />}
              onClick={() => handleOpen({ placement: PopupPlacement.Top })}
        />
        <Cell clickable label="底部弹出"
              endIcon={<ArrowRight />}
              onClick={() => handleOpen({ placement: PopupPlacement.Bottom })}
        />
        <Cell clickable label="左侧弹出"
              endIcon={<ArrowRight />}
              onClick={() => handleOpen({ placement: PopupPlacement.Left })}
        />
        <Cell clickable label="右侧弹出"
              endIcon={<ArrowRight />}
              onClick={() => handleOpen({ placement: PopupPlacement.Right })}
        />
      </Block>
      <Block title="关闭按钮">
        <Cell clickable label="顶部弹出"
              endIcon={<ArrowRight />}
              onClick={() => handleOpen({ placement: PopupPlacement.Top, closeable: true })}
        />
        <Cell clickable label="底部弹出"
              endIcon={<ArrowRight />}
              onClick={() => handleOpen({ placement: PopupPlacement.Bottom, closeable: true })}
        />
        <Cell clickable label="左侧弹出"
              endIcon={<ArrowRight />}
              onClick={() => handleOpen({ placement: PopupPlacement.Left, closeable: true })}
        />
        <Cell clickable label="右侧弹出"
              endIcon={<ArrowRight />}
              onClick={() => handleOpen({ placement: PopupPlacement.Right, closeable: true })}
        />
      </Block>
      <Block title="圆角弹窗">
        <Cell clickable label="圆角弹窗"
              endIcon={<ArrowRight />}
              onClick={() => handleOpen({ placement: PopupPlacement.Bottom, rounded: true })}
        />
      </Block>
      <Popup
        open={options.open}
        placement={options.placement}
        rounded={options.rounded}
        style={options.style}
        closeable={options.closeable}
        onClose={() => setOptions({
          ...options,
          open: false,
        })}
      />
    </Page>
  )
}
