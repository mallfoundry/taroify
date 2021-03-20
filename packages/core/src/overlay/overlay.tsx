import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface OverlayProps {
  open?: boolean
  closable?: boolean
  children?: ReactNode
  onClose?: (event: ITouchEvent) => void
}

export default function Overlay(props: OverlayProps) {
  const { open = false, closable = false, children, onClose } = props

  function handleClose(event: ITouchEvent) {
    if (closable && onClose) {
      onClose(event)
    }
  }

  return (
    <View
      className={classNames(prefixClassname("overlay"), {
        [prefixClassname("overlay-open")]: open,
      })}
      onClick={handleClose}
    >
      {children}
    </View>
  )
}
