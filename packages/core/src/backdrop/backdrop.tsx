import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface BackdropProps {
  open?: boolean
  closeable?: boolean
  children?: ReactNode
  onClose?: (event: ITouchEvent) => void
}

export default function Backdrop(props: BackdropProps) {
  const { open = false, closeable = false, children, onClose } = props

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
      onClick={handleClose}>
      {children}
    </View>
  )
}
