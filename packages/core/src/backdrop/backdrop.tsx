import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface BackdropProps {
  open?: boolean
  closeable?: boolean
  duration?: number
  children?: ReactNode
  onClose?: (event: ITouchEvent) => void
}

export default function Backdrop(props: BackdropProps) {
  const {
    open = false,
    closeable = false,
    duration = 300,
    children,
    onClose,
  } = props

  function handleClose(event: ITouchEvent) {
    if (closeable && onClose) {
      onClose(event)
    }
  }

  return (
    <View
      className={classNames(prefixClassname("backdrop"), {
        [prefixClassname("backdrop-open")]: open,
      })}
      style={{
        transitionDuration: `${duration}ms`,
      }}
      onClick={handleClose}
      children={children}
    />
  )
}
