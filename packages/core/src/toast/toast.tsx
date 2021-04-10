import * as React from "react"
import { ReactElement, ReactNode, useEffect, useState } from "react"
import Popup from "../popup"
import classNames from "classnames"
import { prefixClassname } from "../styles"
import { View } from "@tarojs/components"
import Success from "@taroify/icons/Success"
import Fail from "@taroify/icons/Fail"
import Loading from "../loading"

export enum ToastType {
  Text = "text",
  Loading = "loading",
  Success = "success",
  Fail = "fail",
  Html = "html"
}

type ToastTypeString = "text" | "loading" | "success" | "fail" | "html"

function defaultIcon(icon ?: ReactNode, type?: ToastType | ToastTypeString) {
  if (icon) {
    return icon
  }
  if (type === ToastType.Success) {
    return <Success />
  }
  if (type === ToastType.Loading) {
    return <Loading />
  }
  if (type === ToastType.Fail) {
    return <Fail />
  }
  return undefined
}

function appendIconClassName(node ?: ReactNode) {
  if (!React.isValidElement(node)) {
    return node
  }
  const element = node as ReactElement
  return React.cloneElement(node, {
    className: classNames(prefixClassname("toast__icon"), element.props.className),
  })
}

interface ToastProps {
  open?: boolean
  type?: ToastType | ToastTypeString
  icon?: ReactNode
  backdrop?: boolean
  duration?: number
  children?: ReactNode
  onClose?: () => void
}

export default function Toast(props: ToastProps) {
  const { open: openProp, type = ToastType.Text, backdrop = false, duration = 3000, children, onClose } = props
  const [open, setOpen] = useState(openProp)
  const icon = appendIconClassName(defaultIcon(props.icon, type))

  function handleClose() {
    if (onClose) {
      onClose()
    }
  }

  useEffect(() => {
    setOpen(openProp)
    let timer: any = undefined
    if (openProp) {
      timer = setTimeout(() => {
        setOpen(false)
        handleClose()
        clearTimeout(timer)
      }, duration)
    } else {
      clearTimeout(timer)
    }
    return () => clearTimeout(timer)
  }, [openProp])

  return (
    <Popup
      open={open}
      backdrop={backdrop}
      className={
        classNames(
          prefixClassname("toast"),
          {
            [prefixClassname(`toast--${type}`)]: type,
          },
        )
      }>
      {icon}
      {icon ? <View className={prefixClassname("toast__message")} children={children} /> : children}
    </Popup>
  )
}
