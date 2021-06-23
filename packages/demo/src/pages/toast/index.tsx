import { Cell, Toast } from "@taroify/core"
import { ToastType } from "@taroify/core/toast"
import ArrowRight from "@taroify/icons/ArrowRight"
import * as React from "react"
import { useState } from "react"
import Block from "../../components/block"
import Page from "../../components/page"

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
        <Cell
          clickable
          title="文字提示"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ type: ToastType.Text, message: "文字提示" })}
        />
        <Cell
          clickable
          title="加载提示"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ type: ToastType.Loading, message: "加载中..." })}
        />
        <Cell
          clickable
          title="成功提示"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ type: ToastType.Success, message: "成功文案" })}
        />
        <Cell
          clickable
          title="失败提示"
          rightIcon={<ArrowRight />}
          onClick={() => handleOpen({ type: ToastType.Fail, message: "失败文案" })}
        />
      </Block>
      <Toast
        open={options.open}
        type={options.type}
        onClose={() =>
          setOptions({
            ...options,
            open: false,
          })
        }
      >
        {options.message}
      </Toast>
    </Page>
  )
}
