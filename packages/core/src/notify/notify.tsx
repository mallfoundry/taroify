import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useEffect } from "react"
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
  const [
    {
      id,
      className,
      open = false,
      duration = 3000,
      color = "danger",
      children,
      onClose,
      ...restProps
    },
    setState,
  ] = useObject<NotifyProps & NotifyOptions>(props)

  useEffect(() => {
    let timer: any
    if (open) {
      timer = setTimeout(() => {
        setState({ open: false })
        onClose?.(false)
        clearTimeout(timer)
      }, duration)
    } else if (timer) {
      clearTimeout(timer)
    }
    return () => clearTimeout(timer)
  }, [duration, onClose, open, setState])

  useNotifyOpen(({ selector, message, ...restOptions }: NotifyOptions) => {
    if (matchSelector(selector, id)) {
      setState({
        open: true,
        children: message,
        ...restOptions,
      })
    }
  })

  useNotifyClose((selector) => {
    if (matchSelector(selector, id)) {
      setState({
        open: false,
      })
    }
  })

  return (
    <Popup
      className={classNames(
        prefixClassname("notify"),
        {
          [prefixClassname(`notify--${color}`)]: PRESET_COLORS.includes(color),
        },
        className,
      )}
      placement="top"
      duration={200}
      open={open}
      {...restProps}
    >
      <Popup.Backdrop open={false} />
      {children}
    </Popup>
  )
}

export default Notify
