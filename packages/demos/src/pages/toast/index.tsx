import { useState } from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import Cell from "@taroify/core/cell"
import Toast, { ToastType } from "@taroify/core/toast"
import ArrowForwardIosOutlined from "@taroify/icons/ArrowForwardIosOutlined"


interface OpenOptions {
  open?: boolean
  type?: ToastType
  message?: string
}

export default function ToastDemo() {
  const [options, setOptions] = useState<OpenOptions>({})

  function handleOpen({ type, message }: OpenOptions) {
    setOptions({
      open: true,
      type,
      message,
    })
  }

  return (
    <Page title="Toast">
      <Block title="基础用法">
        <Cell clickable label="文字提示"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => handleOpen({ type: ToastType.Text, message: "文字提示" })}
        />
        <Cell clickable label="加载提示"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => handleOpen({ type: ToastType.Loading, message: "加载中..." })}
        />
        <Cell clickable label="成功提示"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => handleOpen({ type: ToastType.Success, message: "成功文案" })}
        />
        <Cell clickable label="失败提示"
              endIcon={<ArrowForwardIosOutlined color="inherit" size="inherit" />}
              onClick={() => handleOpen({ type: ToastType.Fail, message: "失败文案" })}
        />
      </Block>
      <Toast
        backdrop={false}
        open={options.open}
        type={options.type}
        children={options.message}
        onClose={() => setOptions({
          ...options,
          open: false,
        })}
      />
    </Page>
  )
}
