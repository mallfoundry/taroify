import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface BackdropProps {
  open?: boolean
  closable?: boolean
  children?: ReactNode
  onClose?: (event: ITouchEvent) => void
}

export default function Backdrop(props: BackdropProps) {
  const { open = false, closable = false, children, onClose } = props

  function handleClose(event: ITouchEvent) {
    if (closable && onClose) {
      onClose(event)
    }
  }


  return (
    <View
      className={classNames(prefixClassname("backdrop"), {
        [prefixClassname("backdrop-open")]: open,
      })}
      onClick={handleClose}
    >
      {children}
    </View>
  )
}
