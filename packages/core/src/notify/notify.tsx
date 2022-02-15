import { useUncontrolled } from "@taroify/hooks"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useEffect } from "react"
import { useTimeout } from "../hooks"
import Popup from "../popup"
import { prefixClassname } from "../styles"
import {
  getElementSelector,
  matchSelector,
  prependPageSelector,
  usePrependPageSelector,
} from "../utils/dom/element"
import { useObject, useToRef } from "../utils/state"
import { NotifyOptions, useNotifyClose, useNotifyOpen } from "./notify.imperative"
import { NotifyColor } from "./notify.shared"

const PRESET_COLORS = ["primary", "success", "warning", "danger"]

export interface NotifyProps extends ViewProps {
  style?: CSSProperties
  defaultOpen?: boolean
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
      defaultOpen,
      open: openProp,
      duration = 3000,
      color = "danger",
      children,
      onClose,
      ...restProps
    },
    setObject,
  } = useObject<NotifyProps & NotifyOptions>(props)

  const rootSelectorRef = useToRef(usePrependPageSelector(getElementSelector(id)))

  const { value: open = false, setValue: setOpen } = useUncontrolled({
    defaultValue: defaultOpen,
    value: openProp,
    onChange: (aOpened) => !aOpened && onClose?.(aOpened),
  })

  const { stop: stopAutoClose, restart: restartAutoClose } = useTimeout()

  useEffect(() => {
    if (open) {
      restartAutoClose(() => {
        setOpen(false)
        stopAutoClose()
      }, duration)
    } else {
      stopAutoClose()
    }
    return () => stopAutoClose()
  }, [duration, open, restartAutoClose, setObject, setOpen, stopAutoClose])

  useNotifyOpen(({ selector, message, ...restOptions }: NotifyOptions) => {
    if (matchSelector(prependPageSelector(selector), rootSelectorRef.current)) {
      restartAutoClose()
      setObject({
        children: message,
        ...restOptions,
      })
      setOpen(true)
    }
  })

  useNotifyClose((selector) => {
    if (matchSelector(prependPageSelector(selector), rootSelectorRef.current)) {
      setOpen(false)
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
