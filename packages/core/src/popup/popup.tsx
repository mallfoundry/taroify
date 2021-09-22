import { Cross } from "@taroify/icons"
import { View } from "@tarojs/components"
import { ITouchEvent } from "@tarojs/components/types/common"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { Children, CSSProperties, isValidElement, ReactElement, ReactNode, useContext } from "react"
import { default as SharedBackdrop } from "../backdrop"
import { prefixClassname } from "../styles"
import Transition, { TransitionName } from "../transition"
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
      if (element.type === Popup.Backdrop) {
        children.backdrop = element
      } else if (_.isFunction(element.type) && element.type.name === Popup.Backdrop.name) {
        children.backdrop = element
      } else if (element.type === Popup.Close) {
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

interface PopupProps {
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

  const { backdrop = <Popup.Backdrop />, close, content } = findPopupChildren(children)

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

namespace Popup {
  export interface BackdropProps {
    className?: string
    style?: CSSProperties
    open?: boolean
    duration?: number
    closeable?: boolean
    onClick?: (event: ITouchEvent) => void
  }

  export function Backdrop(props: BackdropProps) {
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

  export enum ClosePlacement {
    TopRight = "top-right",
    TopLeft = "top-left",
    BottomRight = "bottom-right",
    BottomLeft = "bottom-left",
  }

  type ClosePlacementString = "top-right" | "top-left" | "bottom-right" | "bottom-left"

  interface CloseProps {
    placement?: ClosePlacement | ClosePlacementString
    children?: ReactNode
  }

  function useClosePlacement(placement?: ClosePlacement | ClosePlacementString) {
    const { placement: ctxPlacement } = useContext(PopupContext)
    if (placement) {
      return placement
    }

    if (ctxPlacement === PopupPlacement.Right) {
      return ClosePlacement.TopLeft
    } else if (
      ctxPlacement === PopupPlacement.Left ||
      ctxPlacement === PopupPlacement.Top ||
      ctxPlacement === PopupPlacement.Bottom
    ) {
      return ClosePlacement.TopRight
    }
  }

  export function Close(props: CloseProps) {
    const { children = <Cross /> } = props
    const { emitClose } = useContext(PopupContext)
    const placement = useClosePlacement(props.placement)

    if (React.isValidElement(children)) {
      const iconElement = children as ReactElement
      return React.cloneElement(iconElement, {
        className: classNames(iconElement.props.classNames, prefixClassname("popup__close-icon"), {
          [prefixClassname("popup__close-icon--top-left")]: placement === ClosePlacement.TopLeft,
          [prefixClassname("popup__close-icon--top-right")]: placement === ClosePlacement.TopRight,
          [prefixClassname("popup__close-icon--bottom-left")]:
            placement === ClosePlacement.BottomLeft,
          [prefixClassname("popup__close-icon--bottom-left")]:
            placement === ClosePlacement.BottomRight,
        }),
        onClick: () => emitClose?.(false),
      })
    }
    return <>{children}</>
  }
}

export default Popup
