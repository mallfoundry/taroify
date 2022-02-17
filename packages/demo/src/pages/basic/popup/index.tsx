import { Cell, Popup } from "@taroify/core"
import { PopupPlacement } from "@taroify/core/popup"
import { ArrowRight } from "@taroify/icons"
import { CSSProperties, useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicPopup() {
  const [open, setOpen] = useState(false)
  return (
    <>
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
    </>
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
    if (placement === "left" || placement === "right") {
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
      <Block variant="card" title="基础用法">
        <BasicPopup />
      </Block>
      <Block variant="card" title="弹出位置">
        <Cell
          clickable
          title="顶部弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: "top" })}
        />
        <Cell
          clickable
          title="底部弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: "bottom" })}
        />
        <Cell
          clickable
          title="左侧弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: "left" })}
        />
        <Cell
          clickable
          title="右侧弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: "right" })}
        />
      </Block>
      <Block variant="card" title="关闭按钮">
        <Cell
          clickable
          title="顶部弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: "top", closeable: true })}
        />
        <Cell
          clickable
          title="底部弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: "bottom", closeable: true })}
        />
        <Cell
          clickable
          title="左侧弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: "left", closeable: true })}
        />
        <Cell
          clickable
          title="右侧弹出"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: "right", closeable: true })}
        />
      </Block>
      <Block variant="card" title="圆角弹窗">
        <Cell
          clickable
          title="圆角弹窗"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ placement: "bottom", rounded: true })}
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
