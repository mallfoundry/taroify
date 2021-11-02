import { Cross } from "@taroify/icons"
import classNames from "classnames"
import * as React from "react"
import { ReactElement, ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import PopupContext from "./popup.context"

export type PopupClosePlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left"

export interface PopupCloseProps {
  placement?: PopupClosePlacement
  children?: ReactNode
}

function usePopupClosePlacement(placement?: PopupClosePlacement) {
  const { placement: ctxPlacement } = useContext(PopupContext)
  if (placement) {
    return placement
  }
  if (ctxPlacement === "right") {
    return "top-left"
  }
  return "top-right"
}

export default function PopupClose(props: PopupCloseProps) {
  const { children = <Cross /> } = props
  const { onClose } = useContext(PopupContext)
  const placement = usePopupClosePlacement(props.placement)

  if (React.isValidElement(children)) {
    const iconElement = children as ReactElement
    return React.cloneElement(iconElement, {
      className: classNames(iconElement.props.classNames, prefixClassname("popup__close-icon"), {
        [prefixClassname("popup__close-icon--top-left")]: placement === "top-left",
        [prefixClassname("popup__close-icon--top-right")]: placement === "top-right",
        [prefixClassname("popup__close-icon--bottom-left")]:
          placement === "bottom-left" || placement === "bottom-right",
      }),
      onClick: () => onClose?.(false),
    })
  }
  return <>{children}</>
}
