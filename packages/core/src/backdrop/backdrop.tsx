import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import { prefixClassname } from "../styles"

interface BackdropProps {
  className?: string
  style?: CSSProperties
  open?: boolean
  closeable?: boolean
  duration?: number
  children?: ReactNode
  onClose?: (opened: boolean) => void
}

export default function Backdrop(props: BackdropProps) {
  const {
    className,
    style,
    open = false,
    closeable = false,
    duration = 300,
    children,
    onClose,
  } = props

  function handleClose() {
    if (closeable) {
      onClose?.(false)
    }
  }

  return (
    <View
      className={classNames(
        prefixClassname("backdrop"),
        {
          [prefixClassname("backdrop-open")]: open,
        },
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
        ...style,
      }}
      onClick={handleClose}
      children={children}
    />
  )
}
