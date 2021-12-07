import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import { useTimeoutEffect } from "../hooks"
import Popup from "../popup"
import { prefixClassname } from "../styles"
import { matchSelector } from "../utils/dom/element"
import { useObject } from "../utils/state"
import { NotifyOptions, useNotifyClose, useNotifyOpen } from "./notify.imperative"
import { NotifyColor } from "./notify.shared"

const PRESET_COLORS = ["primary", "success", "warning", "danger"]

export interface NotifyProps extends ViewProps {
  style?: CSSProperties
  open?: boolean
  duration?: number
  color?: NotifyColor
  children?: ReactNode

  onClose?(opened: boolean): void
}

function Notify(props: NotifyProps) {
  const {
    object: {
      id,
      className,
      open = false,
      duration = 3000,
      color = "danger",
      children,
      onClose,
      ...restProps
    },
    setObject,
  } = useObject<NotifyProps & NotifyOptions>(props)

  const { stop: stopAutoClose } = useTimeoutEffect(
    () => {
      if (open) {
        setObject({ open: false })
        onClose?.(false)
      }
    },
    duration,
    [open],
  )

  useNotifyOpen(({ selector, message, ...restOptions }: NotifyOptions) => {
    if (matchSelector(selector, id)) {
      stopAutoClose()
      setObject({
        open: true,
        children: message,
        ...restOptions,
      })
    }
  })

  useNotifyClose((selector) => {
    if (matchSelector(selector, id)) {
      setObject({
        open: false,
      })
    }
  })

  return (
    <Popup
      id={id}
      className={classNames(
        prefixClassname("notify"),
        {
          [prefixClassname(`notify--${color}`)]: PRESET_COLORS.includes(color),
        },
        className,
      )}
      placement="top"
      open={open}
      duration={200}
      {...restProps}
    >
      <Popup.Backdrop open={false} />
      {children}
    </Popup>
  )
}

export default Notify
