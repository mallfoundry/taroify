import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useEffect, useState } from "react"
import Popup, { PopupPlacement } from "../popup"
import { prefixClassname } from "../styles"

const PRESET_COLORS = ["primary", "success", "warning", "danger"]

export type NotifyColor = "primary" | "success" | "warning" | "danger"

interface NotifyProps {
  className?: string
  style?: CSSProperties
  open?: boolean
  duration?: number
  color?: NotifyColor
  children?: ReactNode
  onClose?: (opened: boolean) => void
}

function Notify(props: NotifyProps) {
  const {
    className,
    style,
    open: openProp = false,
    duration = 3000,
    color = "danger",
    children,
    onClose,
  } = props
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(openProp), [openProp])

  useEffect(() => {
    setOpen(openProp)
    let timer: any
    if (openProp) {
      timer = setTimeout(() => {
        setOpen(false)
        onClose?.(false)
        clearTimeout(timer)
      }, duration)
    } else if (timer) {
      clearTimeout(timer)
    }
    return () => clearTimeout(timer)
  }, [openProp, duration, onClose])

  return (
    <Popup
      className={classNames(
        prefixClassname("notify"),
        {
          [prefixClassname(`notify--${color}`)]: PRESET_COLORS.includes(color),
        },
        className,
      )}
      style={style}
      placement={PopupPlacement.Top}
      duration={200}
      open={open}
    >
      <Popup.Backdrop open={false} />
      {children}
    </Popup>
  )
}

export default Notify
