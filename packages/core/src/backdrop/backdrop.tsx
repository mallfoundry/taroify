import { View } from "@tarojs/components"
import { ITouchEvent } from "@tarojs/components/types/common"
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
  onClick?: (event: ITouchEvent) => void
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
    onClick,
    onClose,
  } = props

  function handleClick(event: ITouchEvent) {
    onClick?.(event)
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
      onClick={handleClick}
      children={children}
    />
  )
}
