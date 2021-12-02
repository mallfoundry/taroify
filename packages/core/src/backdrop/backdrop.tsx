import { View } from "@tarojs/components"
import { ITouchEvent } from "@tarojs/components/types/common"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import { prefixClassname } from "../styles"
import Transition from "../transition"
import { preventDefault } from "../utils/dom/event"

interface BackdropProps extends ViewProps {
  style?: CSSProperties
  open?: boolean
  closeable?: boolean
  duration?: number
  children?: ReactNode
  onClose?: (opened: boolean) => void
}

export default function Backdrop(props: BackdropProps) {
  const {
    className,
    style,
    open = false,
    closeable = false,
    duration = 300,
    children,
    onClick,
    onClose,
    ...restProps
  } = props

  function handleClick(event: ITouchEvent) {
    onClick?.(event)
    if (closeable) {
      onClose?.(false)
    }
  }

  return (
    <Transition in={open} duration={duration} appear mountOnEnter name="fade">
      <View
        className={classNames(
          prefixClassname("backdrop"),
          {
            [prefixClassname("backdrop--open")]: open,
          },
          className,
        )}
        style={{
          ...style,
        }}
        catchMove
        children={children}
        onClick={handleClick}
        onTouchMove={preventDefault}
        {...restProps}
      />
    </Transition>
  )
}

Backdrop.displayName = "Backdrop"
