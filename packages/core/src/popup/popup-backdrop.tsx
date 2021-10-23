import { ITouchEvent } from "@tarojs/components/types/common"
import * as React from "react"
import { CSSProperties, useContext } from "react"
import { default as SharedBackdrop } from "../backdrop"
import PopupContext from "./popup.context"

export interface PopupBackdropProps {
  className?: string
  style?: CSSProperties
  open?: boolean
  duration?: number
  closeable?: boolean
  onClick?: (event: ITouchEvent) => void
}

export default function PopupBackdrop(props: PopupBackdropProps) {
  const {
    className,
    style,
    open: openProp = true,
    duration = 300,
    closeable = true,
    onClick,
  } = props
  const { open, emitClose } = useContext(PopupContext)
  return (
    <SharedBackdrop
      className={className}
      style={style}
      open={openProp && open}
      duration={duration}
      closeable={closeable}
      onClick={onClick}
      onClose={emitClose}
    />
  )
}
