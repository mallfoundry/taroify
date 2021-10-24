import { Cell, Popup } from "@taroify/core"
import { PopupPlacement } from "@taroify/core/popup"
import { ArrowRight } from "@taroify/icons"
import * as React from "react"
import { CSSProperties, useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicPopup() {
  const [open, setOpen] = useState(false)
  return (
    <Block title="基础用法">
      <Cell clickable title="显示遮盖层" rightIcon={<ArrowRight />} onClick={() => setOpen(true)} />
      <Popup
        open={open}
        style={{
          padding: "30px 50px",
        }}
        onClose={setOpen}
      >
        内容
      </Popup>
    </Block>
  )
}

interface OpenOptions {
  open?: boolean
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
      closeable,
    }
    if (placement === PopupPlacement.Left || placement === PopupPlacement.Right) {
      openOptions.style = {
        height: "20%",
        width: "100%",
      }
    } else if (placement) {
      openOptions.style = { height: "30%" }
    }
    setOptions({
      ...options,
      ...openOptions,
    })
  }

  return (
    <Page title="Popup 弹出层" className="popup-demo">
      <BasicPopup />
      <Block title="弹出位置">
        <Cell
          clickable
          title="顶部弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: PopupPlacement.Top })}
        />
        <Cell
          clickable
          title="底部弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: PopupPlacement.Bottom })}
        />
        <Cell
          clickable
          title="左侧弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: PopupPlacement.Left })}
        />
        <Cell
          clickable
          title="右侧弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: PopupPlacement.Right })}
        />
      </Block>
      <Block title="关闭按钮">
        <Cell
          clickable
          title="顶部弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: PopupPlacement.Top, closeable: true })}
        />
        <Cell
          clickable
          title="底部弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: PopupPlacement.Bottom, closeable: true })}
        />
        <Cell
          clickable
          title="左侧弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: PopupPlacement.Left, closeable: true })}
        />
        <Cell
          clickable
          title="右侧弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: PopupPlacement.Right, closeable: true })}
        />
      </Block>
      <Block title="圆角弹窗">
        <Cell
          clickable
          title="圆角弹窗"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: PopupPlacement.Bottom, rounded: true })}
        />
      </Block>
      <Popup
        open={options.open}
        placement={options.placement}
        rounded={options.rounded}
        style={options.style}
        onClose={() =>
          setOptions({
            ...options,
            open: false,
          })
        }
      >
        <Popup.Backdrop />
        {options.closeable && <Popup.Close />}
      </Popup>
    </Page>
  )
}
