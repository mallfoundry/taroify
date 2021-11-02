import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useEffect } from "react"
import Popup from "../popup"
import { prefixClassname } from "../styles"
import { useObject } from "../utils/state"
import { NotifyOptions, useNotifyOpened } from "./notify.imperative"
import { NotifyColor } from "./notify.shared"

const PRESET_COLORS = ["primary", "success", "warning", "danger"]

function matchNotify(selector?: string, id?: string) {
  return _.replace(selector as string, "#", "") === id
}

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

  useNotifyOpened(({ selector, message, ...restOptions }: NotifyOptions) => {
    if (matchNotify(selector as string, id)) {
      setState({
        open: true,
        children: message,
        ...restOptions,
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
