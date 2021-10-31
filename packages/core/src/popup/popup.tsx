import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { Children, isValidElement, ReactElement, ReactNode } from "react"
import Backdrop from "../backdrop"
import { prefixClassname } from "../styles"
import Transition, { TransitionName } from "../transition"
import { isElementOf } from "../utils/validate"
import PopupBackdrop from "./popup-backdrop"
import PopupClose from "./popup-close"
import PopupContext from "./popup.context"
import { PopupPlacement } from "./popup.shared"

function toTransactionName(placement?: PopupPlacement) {
  if (placement === "top") {
    return TransitionName.SlideDown
  }

  if (placement === "bottom") {
    return TransitionName.SlideUp
  }

  if (placement === "right") {
    return TransitionName.SlideRight
  }

  if (placement === "left") {
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
      if (isElementOf(element, Backdrop)) {
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

export interface PopupProps extends ViewProps {
  open?: boolean
  transaction?: string
  placement?: PopupPlacement
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
    open,
    transaction,
    placement,
    rounded = false,
    duration,
    children,
    onOpen,
    onClose,
    onClosed,
    ...restProps
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
              [prefixClassname("popup--rounded")]: rounded,
              [prefixClassname("popup--center")]: _.isUndefined(placement),
              [prefixClassname("popup--top")]: placement === "top",
              [prefixClassname("popup--right")]: placement === "right",
              [prefixClassname("popup--bottom")]: placement === "bottom",
              [prefixClassname("popup--left")]: placement === "left",
            },
            className,
          )}
          {...restProps}
        >
          {close}
          {content}
        </View>
      </Transition>
    </PopupContext.Provider>
  )
}

export default Popup
