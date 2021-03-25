import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import classNames from "classnames"
import { View } from "@tarojs/components"
import { prefixClassname } from "../styles"
import Backdrop from "../backdrop"
import * as _ from "lodash"
import Transition, { TransitionName } from "../transition"

export enum PopupAnchor {
  Top = "top",
  Right = "right",
  Bottom = "bottom",
  Left = "left",
}

type PopupAnchorString = "top" | "right" | "bottom" | "left"

function getTransactionName(anchor?: PopupAnchor | PopupAnchorString) {

  if (anchor === PopupAnchor.Top) {
    return TransitionName.SlideDown
  }

  if (anchor === PopupAnchor.Bottom) {
    return TransitionName.SlideUp
  }

  if (anchor === PopupAnchor.Right) {
    return TransitionName.SlideRight
  }

  if (anchor === PopupAnchor.Left) {
    return TransitionName.SlideLeft
  }

  return TransitionName.Fade
}

interface PopupProps {
  className?: string
  style?: CSSProperties
  open?: boolean
  anchor?: PopupAnchor | PopupAnchorString
  rounded?: boolean
  duration?: number
  closeable?: boolean
  backdrop?: boolean
  backdropCloseable?: boolean
  children?: ReactNode
  onClose?: () => void
}

export default function Popup(props: PopupProps) {
  const {
    className,
    style,
    open,
    anchor,
    rounded = false,
    duration,
    // closeable,
    backdrop = true,
    backdropCloseable = true,
    children,
    onClose,
  } = props

  const transactionName = getTransactionName(anchor)
  return (
    <>
      {
        backdrop && <Backdrop
          open={open && backdrop}
          duration={duration}
          closeable={backdropCloseable}
          onClose={onClose} />
      }
      <Transition in={open} name={transactionName} duration={duration}>
        <View
          className={classNames(prefixClassname("popup"),
            {
              [prefixClassname("popup-open")]: open,
              [prefixClassname("popup-rounded")]: rounded,
              [prefixClassname("popup-center")]: _.isUndefined(anchor),
              [prefixClassname("popup-anchor-top")]: anchor === PopupAnchor.Top,
              [prefixClassname("popup-anchor-right")]: anchor === PopupAnchor.Right,
              [prefixClassname("popup-anchor-bottom")]: anchor === PopupAnchor.Bottom,
              [prefixClassname("popup-anchor-left")]: anchor === PopupAnchor.Left,
            },
            className)}
          style={style}>
          {children}
        </View>
      </Transition>
    </>
  )
}
