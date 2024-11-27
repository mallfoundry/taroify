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
import mergeStyle from "../utils/merge-style"
import { NotifyColor, NotifyOptions, notifyEvents, notifySelectorSet } from "./notify.shared"

const PRESET_COLORS = ["primary", "success", "warning", "danger"]

function useNotifyOpen(cb: (options: NotifyOptions) => void) {
  useEffect(() => {
    notifyEvents.on("open", cb)
    return () => {
      notifyEvents.off("open", cb)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

function useNotifyClose(cb: (selector: string) => void) {
  useEffect(() => {
    notifyEvents.on("close", cb)
    return () => {
      notifyEvents.off("close", cb)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export interface NotifyProps extends ViewProps {
  style?: CSSProperties
  defaultOpen?: boolean
  open?: boolean
  duration?: number
  type?: NotifyColor
  color?: string
  background?: string
  children?: ReactNode

  onClose?(opened: boolean): void
}

function Notify(props: NotifyProps) {
  const {
    object: {
      id,
      style: styleProp,
      className,
      defaultOpen,
      open: openProp,
      duration = 3000,
      type: typeProp,
      background: backgroundProp,
      color: colorProp = "danger",
      children,
      onClose,
      ...restProps
    },
    setObject,
  } = useObject<NotifyProps & NotifyOptions>(props)

  const style = mergeStyle(styleProp, {
    background: backgroundProp,
    ...(!PRESET_COLORS.includes(colorProp) && ({"--notify-color": colorProp}))
  })

  const rootSelectorRef = useToRef(usePrependPageSelector(getElementSelector(id)))

  const { value: open = false, setValue: setOpen } = useUncontrolled({
    defaultValue: defaultOpen,
    value: openProp,
    onChange: (aOpened) => !aOpened && onClose?.(aOpened),
  })

  const { stop: stopAutoClose, restart: restartAutoClose } = useTimeout()

  useEffect(() => {
    rootSelectorRef.current && notifySelectorSet.add(rootSelectorRef.current)
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      rootSelectorRef.current && notifySelectorSet.delete(rootSelectorRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          [prefixClassname(`notify--${typeProp || colorProp}`)]: PRESET_COLORS.includes(typeProp! || colorProp!),
        },
        className,
      )}
      style={style}
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
