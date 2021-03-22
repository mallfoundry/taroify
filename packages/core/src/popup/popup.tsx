import * as React from "react"
import { ReactNode } from "react"
import classNames from "classnames"
import { View } from "@tarojs/components"
import { prefixClassname } from "../styles"
import Backdrop from "../backdrop"

// interface PopupHeaderProps {
//   closeable?: boolean;
//   children?: ReactNode
//   onClose?: () => void
// }
//
// function PopupHeader({ closeable, children, onClose }: PopupHeaderProps) {
//   return (
//     <View className={prefixClassname("popup-header")}>
//       {children}
//       {/*{closeable && <AtIcon className={prefixClassName("popup-close")} value="close" onClick={onClose} />}*/}
//     </View>
//   )
// }

// interface PopupContainerProps {
//   closeable?: boolean;
//   children?: ReactNode;
//   onClose?: () => void
// }
//
// function PopupContainer({ closeable, children, onClose }: PopupContainerProps) {
//   return (
//     <View className={prefixClassname("popup-container")}>
//       {/*<PopupHeader closeable={closeable} onClose={onClose} />*/}
//       {children}
//     </View>
//   )
// }

export enum PopupAnchor {
  Top = "top",
  Right = "right",
  Bottom = "bottom",
  Left = "left",
}

type PopupAnchorString = "top" | "right" | "bottom" | "left"

interface PopupProps {
  open?: boolean
  anchor?: PopupAnchor | PopupAnchorString
  closeable?: boolean
  children?: ReactNode
  onClose?: () => void
}

export default function Popup(props: PopupProps) {
  const { open, anchor = PopupAnchor.Bottom, closeable, children, onClose } = props
  console.log(closeable)
  return (
    <>
      <Backdrop open={open} closable onClose={onClose} />
      <View
        className={classNames(prefixClassname("popup"),
          {
            [prefixClassname("popup-open")]: open,
            [prefixClassname("popup-anchor-top")]: anchor === PopupAnchor.Top,
            [prefixClassname("popup-anchor-right")]: anchor === PopupAnchor.Right,
            [prefixClassname("popup-anchor-bottom")]: anchor === PopupAnchor.Bottom,
            [prefixClassname("popup-anchor-left")]: anchor === PopupAnchor.Left,
          })}>
        {children}
      </View>
    </>
  )
}
