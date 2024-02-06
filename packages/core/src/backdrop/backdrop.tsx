import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import { ITouchEvent } from "@tarojs/components/types/common"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useMemo } from "react"
import { prefixClassname } from "../styles"
import Transition from "../transition"
import { preventDefault } from "../utils/dom/event"
import { useLockScrollTaro } from "../utils/dom/use-lock-scroll-taro"

interface BackdropProps extends ViewProps {
  style?: CSSProperties
  defaultOpen?: boolean
  open?: boolean
  closeable?: boolean
  duration?: number
  children?: ReactNode
  lock?: boolean

  onClose?(opened: boolean): void
}

export default function Backdrop(props: BackdropProps) {
  const {
    className,
    style: styleProp,
    defaultOpen,
    open: openProp,
    closeable = false,
    lock = true,
    duration,
    children,
    onClick,
    onClose,
    ...restProps
  } = props

  const { value: open = false, setValue } = useUncontrolled({
    defaultValue: defaultOpen,
    value: openProp,
  })

  const refPopup = useLockScrollTaro(!!open && lock)

  const durationStyle = useMemo(
    () => (_.isNumber(duration) ? { "--animation-duration-base": `${duration as number}ms` } : {}),
    [duration],
  )

  function handleClick(event: ITouchEvent) {
    onClick?.(event)
    if (closeable) {
      setValue(false)
      onClose?.(false)
    }
  }

  return (
    <Transition in={open} appear mountOnEnter name="fade">
      <View
        ref={refPopup}
        className={classNames(
          prefixClassname("backdrop"),
          {
            [prefixClassname("backdrop--open")]: open,
          },
          className,
        )}
        style={{
          ...durationStyle,
          ...styleProp,
        }}
        catchMove={lock}
        children={children}
        onClick={handleClick}
        onTouchMove={preventDefault}
        {...restProps}
      />
    </Transition>
  )
}

Backdrop.displayName = "Backdrop"
