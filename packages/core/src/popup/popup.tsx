import * as React from "react"
import { CSSProperties, ReactElement, ReactNode } from "react"
import classNames from "classnames"
import { View } from "@tarojs/components"
import { prefixClassname } from "../styles"
import Backdrop from "../backdrop"
import * as _ from "lodash"
import Transition, { TransitionName } from "../transition"
import Cross from "@taroify/icons/Cross"

export enum PopupPlacement {
  Top = "top",
  Right = "right",
  Bottom = "bottom",
  Left = "left",
}

type PopupPlacementString = "top" | "right" | "bottom" | "left"

function toTransactionName(placement?: PopupPlacement | PopupPlacementString) {

  if (placement === PopupPlacement.Top) {
    return TransitionName.SlideDown
  }

  if (placement === PopupPlacement.Bottom) {
    return TransitionName.SlideUp
  }

  if (placement === PopupPlacement.Right) {
    return TransitionName.SlideRight
  }

  if (placement === PopupPlacement.Left) {
    return TransitionName.SlideLeft
  }

  return TransitionName.Fade
}

enum PopupBackdrop {
  Static = "static"
}

type PopupBackdropString = "static"

interface PopupCloseProps {
  placement?: PopupPlacement | PopupPlacementString
  children?: ReactNode
  onClick?: () => void
}

function PopupClose(props: PopupCloseProps) {
  const { placement, children = <Cross /> } = props

  if (React.isValidElement(children)) {
    const iconElement = children as ReactElement
    return React.cloneElement(iconElement, {
      className: classNames(iconElement.props.classNames, prefixClassname("popup__close-icon"), {
        [prefixClassname("popup__close-icon--top-right")]: placement === PopupPlacement.Left || placement === PopupPlacement.Top || placement === PopupPlacement.Bottom,
        [prefixClassname("popup__close-icon--top-left")]: placement === PopupPlacement.Right,
      }),
    })
  }

  return (
    <>
      {children}
    </>
  )
}

interface PopupProps {
  className?: string
  style?: CSSProperties
  open?: boolean
  placement?: PopupPlacement | PopupPlacementString
  rounded?: boolean
  duration?: number
  backdrop?: boolean | PopupBackdrop | PopupBackdropString
  // backdropCloseable?: boolean
  closeable?: boolean
  closeIcon?: ReactNode
  children?: ReactNode
  onClose?: () => void
}

export default function Popup(props: PopupProps) {
  const {
    className,
    style,
    open,
    placement,
    rounded = false,
    duration,
    closeable,
    backdrop = true,
    // backdropCloseable = true,
    children,
    onClose,
  } = props

  const transactionName = toTransactionName(placement)
  return (
    <>
      {
        backdrop && <Backdrop
          open={open/* && backdrop*/}
          duration={duration}
          closeable={backdrop !== PopupBackdrop.Static}
          onClose={onClose} />
      }
      <Transition in={open} name={transactionName} duration={duration}>
        <View
          className={classNames(prefixClassname("popup"),
            {
              [prefixClassname("popup--open")]: open,
              [prefixClassname("popup--rounded")]: rounded,
              [prefixClassname("popup--center")]: _.isUndefined(placement),
              [prefixClassname("popup--top")]: placement === PopupPlacement.Top,
              [prefixClassname("popup--right")]: placement === PopupPlacement.Right,
              [prefixClassname("popup--bottom")]: placement === PopupPlacement.Bottom,
              [prefixClassname("popup--left")]: placement === PopupPlacement.Left,
            },
            className)}
          style={style}>
          {closeable && <PopupClose placement={placement} />}
          {children}
        </View>
      </Transition>
    </>
  )
}
