import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface BackdropProps {
  open?: boolean
  closeable?: boolean
  duration?: number
  children?: ReactNode
  onClose?: (opened: boolean) => void
}

export default function Backdrop(props: BackdropProps) {
  const { open = false, closeable = false, duration = 300, children, onClose } = props

  function handleClose() {
    if (closeable) {
      onClose?.(false)
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
