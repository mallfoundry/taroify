import * as React from "react"
import { ReactNode } from "react"
import * as classNames from "classnames"
import { View } from "@tarojs/components"
import { prefixClassname } from "../styles"
import Overlay from "../overlay"

interface PopupHeaderProps {
  closeable?: boolean;
  children?: ReactNode
  onClose?: () => void
}

function PopupHeader({ closeable, children, onClose }: PopupHeaderProps) {
  return (
    <View className={prefixClassname("popup-header")}>
      {children}
      {/*{closeable && <AtIcon className={prefixClassName("popup-close")} value="close" onClick={onClose} />}*/}
    </View>
  )
}

interface PopupContainerProps {
  closeable?: boolean;
  children?: ReactNode;
  onClose?: () => void
}

function PopupContainer({ closeable, children, onClose }: PopupContainerProps) {
  return (
    <View className={prefixClassname("popup-container")}>
      <PopupHeader closeable={closeable} onClose={onClose} />
      {children}
    </View>
  )
}

interface PopupProps {
  open?: boolean
  closeable?: boolean
  children?: ReactNode
  onClose?: () => void
}

export default function Popup(props: PopupProps) {
  const { open, closeable, children, onClose } = props

  return (
    <View className={classNames(prefixClassname("popup"),
      {
        [prefixClassname("popup-open")]: open,
      })}
    >
      <Overlay open={open} closable onClose={onClose} />
      <PopupContainer closeable={closeable} onClose={onClose}>
        {children}
      </PopupContainer>
    </View>
  )
}
