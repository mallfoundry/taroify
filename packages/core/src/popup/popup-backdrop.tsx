import { ViewProps } from "@tarojs/components/types/View"
import * as React from "react"
import { CSSProperties, useContext } from "react"
import { default as SharedBackdrop } from "../backdrop"
import PopupContext from "./popup.context"

export interface PopupBackdropProps extends ViewProps {
  style?: CSSProperties
  open?: boolean
  duration?: number
  closeable?: boolean
}

export default function PopupBackdrop(props: PopupBackdropProps) {
  const { open: openProp = true, duration = 300, closeable = true, ...restProps } = props
  const { open, emitClose } = useContext(PopupContext)
  return (
    <SharedBackdrop
      open={openProp && open}
      duration={duration}
      closeable={closeable}
      onClose={emitClose}
      {...restProps}
    />
  )
}
