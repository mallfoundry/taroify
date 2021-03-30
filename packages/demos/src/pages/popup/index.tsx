import "@taroify/core/index.scss"
import Page from "../../components/page"
import { CSSProperties, useState } from "react"
import Popup, { PopupAnchor } from "@taroify/core/popup"
import Cell from "@taroify/core/cell"
import Block from "../../components/block"
import ArrowForwardIosOutlined from "@taroify/icons/ArrowForwardIosOutlined"

interface OpenOptions {
  open?: boolean,
  style?: CSSProperties
  anchor?: PopupAnchor
  rounded?: boolean
}

export default function PopupDemo() {
  const [options, setOptions] = useState<OpenOptions>({})

  function handleOpen({ anchor, rounded }: OpenOptions) {
    const openOptions: OpenOptions = {
      open: true,
      anchor,
      rounded,
    }
    if (anchor === PopupAnchor.Left || anchor === PopupAnchor.Right) {
      openOptions.style = {
        height: "20%",
        width: "20%",
      }
    } else if (anchor) {
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
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => handleOpen({ anchor: undefined })}
        />
      </Block>
      <Block title="弹出位置">
        <Cell clickable label="顶部弹出"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => handleOpen({ anchor: PopupAnchor.Top })}
        />
        <Cell clickable label="底部弹出"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => handleOpen({ anchor: PopupAnchor.Bottom })}
        />
        <Cell clickable label="左侧弹出"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => handleOpen({ anchor: PopupAnchor.Left })}
        />
        <Cell clickable label="右侧弹出"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => handleOpen({ anchor: PopupAnchor.Right })}
        />
      </Block>
      <Block title="圆角弹窗">
        <Cell clickable label="圆角弹窗"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => handleOpen({ anchor: PopupAnchor.Bottom, rounded: true })}
        />
      </Block>
      <Popup
        open={options.open}
        anchor={options.anchor}
        rounded={options.rounded}
        style={options.style}
        onClose={() => setOptions({
          ...options,
          open: false,
        })}
      />
    </Page>
  )
}
