import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { Children, CSSProperties, isValidElement, ReactElement, ReactNode } from "react"
import { isBackdropElement } from "../backdrop"
import { prefixClassname } from "../styles"
import Transition, { TransitionName } from "../transition"
import PopupBackdrop from "./popup-backdrop"
import PopupClose from "./popup-close"
import PopupContext from "./popup.context"
import { PopupPlacement, PopupPlacementString } from "./popup.shared"

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

interface PopupChildren {
  backdrop?: ReactNode
  close?: ReactNode
  content: ReactNode[]
}

function findPopupChildren(node?: ReactNode): PopupChildren {
  const children: PopupChildren = {
    backdrop: undefined,
    close: undefined,
    content: [],
  }

  Children.forEach(node, (child: ReactNode) => {
    if (isValidElement(child)) {
      const element = child as ReactElement
      if (isBackdropElement(element)) {
        children.backdrop = element
      } else if (element.type === PopupClose) {
        children.close = element
      } else {
        children.content.push(child)
      }
    } else {
      children.content.push(child)
    }
  })

  return children
}

export interface PopupProps {
  className?: string
  style?: CSSProperties
  open?: boolean
  transaction?: string
  placement?: PopupPlacement | PopupPlacementString
  rounded?: boolean
  duration?: number | { appear?: number; enter?: number; exit?: number }
  children?: ReactNode
  onOpen?: (opened: boolean) => void
  onClose?: (opened: boolean) => void
  onClosed?: () => void
}

function Popup(props: PopupProps) {
  const {
    className,
    style,
    open,
    transaction,
    placement,
    rounded = false,
    duration,
    children,
    onOpen,
    onClose,
    onClosed,
  } = props

  const transactionName = transaction ?? toTransactionName(placement)

  const { backdrop = <PopupBackdrop />, close, content } = findPopupChildren(children)

  return (
    <PopupContext.Provider
      value={{
        open,
        placement,
        emitClose: onClose,
      }}
    >
      {backdrop}
      <Transition
        in={open}
        name={transactionName}
        duration={duration}
        onEnter={() => onOpen?.(true)}
        onExited={onClosed}
      >
        <View
          className={classNames(
            prefixClassname("popup"),
            {
              // [prefixClassname("popup--open")]: open,
              [prefixClassname("popup--rounded")]: rounded,
              [prefixClassname("popup--center")]: _.isUndefined(placement),
              [prefixClassname("popup--top")]: placement === PopupPlacement.Top,
              [prefixClassname("popup--right")]: placement === PopupPlacement.Right,
              [prefixClassname("popup--bottom")]: placement === PopupPlacement.Bottom,
              [prefixClassname("popup--left")]: placement === PopupPlacement.Left,
            },
            className,
          )}
          style={style}
        >
          {close}
          {content}
        </View>
      </Transition>
    </PopupContext.Provider>
  )
}

export default Popup
