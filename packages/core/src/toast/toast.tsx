import Fail from "@taroify/icons/Fail"
import Success from "@taroify/icons/Success"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactElement, ReactNode, useEffect, useState } from "react"
import Loading from "../loading"
import Popup from "../popup"
import { prefixClassname } from "../styles"

export enum ToastType {
  Text = "text",
  Loading = "loading",
  Success = "success",
  Fail = "fail",
  Html = "html",
}

type ToastTypeString = "text" | "loading" | "success" | "fail" | "html"

function defaultIcon(icon?: ReactNode, type?: ToastType | ToastTypeString) {
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

function appendIconClassName(node?: ReactNode) {
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
  duration?: number
  children?: ReactNode
  onClose?: () => void
}

export default function Toast(props: ToastProps) {
  const {
    open: openProp = false,
    type = ToastType.Text,
    duration = 3000,
    children,
    onClose,
  } = props
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(openProp), [openProp])

  const icon = appendIconClassName(defaultIcon(props.icon, type))
  useEffect(() => {
    setOpen(openProp)
    let timer: any
    if (openProp) {
      timer = setTimeout(() => {
        setOpen(false)
        onClose?.()
        clearTimeout(timer)
      }, duration)
    } else if (timer) {
      clearTimeout(timer)
    }
    return () => clearTimeout(timer)
  }, [openProp, duration, onClose])

  return (
    <Popup
      open={open}
      className={classNames(prefixClassname("toast"), {
        [prefixClassname(`toast--${type}`)]: type,
      })}
    >
      <Popup.Backdrop open={false} />
      {icon}
      {icon ? <View className={prefixClassname("toast__message")} children={children} /> : children}
    </Popup>
  )
}
