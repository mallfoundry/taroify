import Fail from "@taroify/icons/Fail"
import Success from "@taroify/icons/Success"
import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactElement, ReactNode, useEffect, useState } from "react"
import Loading from "../loading"
import Popup from "../popup"
import { prefixClassname } from "../styles"

export type ToastType = "text" | "loading" | "success" | "fail" | "html"

export type ToastPosition = "top" | "middle" | "bottom"

function defaultIcon(icon?: ReactNode, type?: ToastType) {
  if (icon) {
    return icon
  }
  if (type === "success") {
    return <Success />
  }
  if (type === "loading") {
    return <Loading />
  }
  if (type === "fail") {
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
  className?: string
  open?: boolean
  type?: ToastType
  position?: ToastPosition
  icon?: ReactNode
  duration?: number
  children?: ReactNode
  onClose?: () => void
}

export default function Toast(props: ToastProps) {
  const {
    className,
    open: openProp = false,
    type = "text",
    position = "middle",
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
      className={classNames(
        prefixClassname("toast"),
        {
          [prefixClassname(`toast--${position}`)]: position,
          [prefixClassname(`toast--${type}`)]: !icon,
        },
        className,
      )}
    >
      <Popup.Backdrop open={false} />
      {
        //
        icon &&
          cloneIconElement(icon, {
            className: prefixClassname("toast__icon"),
          })
      }
      {icon ? <View className={prefixClassname("toast__message")} children={children} /> : children}
    </Popup>
  )
}
