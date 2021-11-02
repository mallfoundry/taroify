import { Fail, Success } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
} from "react"
import Backdrop from "../backdrop"
import Loading from "../loading"
import Popup, { PopupBackdropProps } from "../popup"
import { prefixClassname } from "../styles"
import { useObject } from "../utils/state"
import { isElementOf } from "../utils/validate"
import { ToastOptions, useToastOpened } from "./toast.imperative"
import { ToastPosition, ToastType } from "./toast.shared"

function matchToast(selector?: string, id?: string) {
  return _.replace(selector as string, "#", "") === id
}

function defaultToastIcon(icon?: ReactNode, type?: ToastType): ReactNode {
  if (icon) {
    return icon
  }
  if (type === "success") {
    return <Success />
  }
  if (type === "loading") {
    return <Loading />
  }
  if (type === "fail") {
    return <Fail />
  }
  return undefined
}

function useToastIcon(node?: ReactNode, type?: ToastType) {
  return useMemo(() => {
    const icon = defaultToastIcon(node, type)
    if (!isValidElement(icon)) {
      return icon
    }
    const element = icon as ReactElement
    return cloneElement(icon, {
      className: classNames(prefixClassname("toast__icon"), element.props.className),
    })
  }, [node, type])
}

interface ToastChildren {
  backdrop?: ReactNode
  content?: ReactNode[]
}

function useToastChildren(children?: ReactNode): ToastChildren {
  return useMemo(() => {
    const __children__: ToastChildren = {
      content: [],
    }
    Children.forEach(children, (child: ReactNode) => {
      if (isValidElement(child)) {
        const element = child as ReactElement
        if (isElementOf(element, Backdrop)) {
          __children__.backdrop = element
        } else {
          __children__.content?.push(child)
        }
      } else {
        __children__.content?.push(child)
      }
    })
    if (!__children__.backdrop) {
      __children__.backdrop = <Popup.Backdrop open={false} />
    }
    return __children__
  }, [children])
}

function useToastBackdrop(
  backdrop?: ReactNode,
  options?: boolean | Omit<PopupBackdropProps, "open">,
) {
  return useMemo(() => {
    if (_.isUndefined(options) || _.isNull(options) || _.isEmpty(options)) {
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

export interface ToastProps extends ViewProps {
  className?: string
  style?: CSSProperties
  open?: boolean
  type?: ToastType
  position?: ToastPosition
  icon?: ReactNode
  duration?: number
  children?: ReactNode

  onClose?(): void
}

export default function Toast(props: ToastProps) {
  const [
    {
      id,
      className,
      open = false,
      icon: iconProp,
      type = "text",
      position = "middle",
      duration = 3000,
      children: childrenProp,
      backdrop: backdropOptions,
      onClose,
      ...restProps
    },
    setState,
  ] = useObject<ToastProps & ToastOptions>(props)
  const { backdrop: backdropElement, content } = useToastChildren(childrenProp)
  const backdrop = useToastBackdrop(backdropElement, backdropOptions)
  const icon = useToastIcon(iconProp, type)

  useEffect(() => {
    let timer: any
    if (open) {
      timer = setTimeout(() => {
        setState({ open: false })
        onClose?.()
        clearTimeout(timer)
      }, duration)
    } else if (timer) {
      clearTimeout(timer)
    }
    return () => clearTimeout(timer)
  }, [duration, onClose, open, setState])

  useToastOpened(({ selector, message, ...restOptions }: ToastOptions) => {
    if (matchToast(selector as string, id)) {
      setState({
        open: true,
        children: message,
        ...restOptions,
      })
    }
  })

  return (
    <Popup
      open={open}
      id={id}
      className={classNames(
        prefixClassname("toast"),
        {
          [prefixClassname(`toast--${position}`)]: position,
          [prefixClassname(`toast--${type}`)]: !icon,
        },
        className,
      )}
      {...restProps}
    >
      {backdrop}
      {
        //
        icon &&
          cloneIconElement(icon, {
            className: prefixClassname("toast__icon"),
          })
      }
      {icon ? <View className={prefixClassname("toast__message")} children={content} /> : content}
    </Popup>
  )
}
