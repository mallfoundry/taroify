import { ViewProps } from "@tarojs/components/types/View"
import * as _ from "lodash"
import * as React from "react"
import { cloneElement, CSSProperties, ReactElement, ReactNode, useContext, useMemo } from "react"
import { default as SharedBackdrop } from "../backdrop"
import PopupContext from "./popup.context"

export interface PopupBackdropProps extends ViewProps {
  style?: CSSProperties
  open?: boolean
  duration?: number
  closeable?: boolean
}

export default function PopupBackdrop(props: PopupBackdropProps) {
  const { open: openProp = true, duration, closeable = true, ...restProps } = props
  const { open, duration: ctxDuration, onClose } = useContext(PopupContext)
  return (
    <SharedBackdrop
      open={openProp && open}
      duration={duration ?? ctxDuration}
      closeable={closeable}
      onClose={onClose}
      {...restProps}
    />
  )
}

PopupBackdrop.displayName = "PopupBackdrop"

export function usePopupBackdrop(
  backdrop: ReactNode = <PopupBackdrop />,
  options?: boolean | Omit<PopupBackdropProps, "open">,
) {
  return useMemo(() => {
    if (_.isUndefined(options) || _.isNull(options)) {
      return backdrop
    }
    if (_.isBoolean(options) && options) {
      return cloneElement(backdrop as ReactElement, { open: true })
    }
    if (_.isBoolean(options) && !options) {
      return cloneElement(backdrop as ReactElement, { open: false })
    }
    return cloneElement(backdrop as ReactElement, { ...options, open: true })
  }, [backdrop, options])
}
