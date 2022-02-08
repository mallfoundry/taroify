import { cloneIconElement, isIconElement } from "@taroify/icons/utils"
import { ButtonProps as TaroButtonProps, View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { Children, cloneElement, isValidElement, ReactNode, useContext, useMemo } from "react"
import ButtonBase from "../button-base"
import Loading, { LoadingProps } from "../loading"
import { prefixClassname } from "../styles"
import { isTextElement } from "../utils/validate"
import ButtonContext from "./button.context"
import {
  ButtonColor,
  ButtonFormType,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from "./button.shared"

function useButtonLoading(loading?: boolean | LoadingProps): ReactNode {
  return useMemo(() => {
    if (_.isBoolean(loading) && loading) {
      return <Loading className={prefixClassname("button__loading")} />
    } else if (_.isPlainObject(loading)) {
      const { className, ...restProps } = loading as LoadingProps
      return (
        <Loading
          className={classNames(prefixClassname("button__loading"), className)}
          {...restProps}
        />
      )
    }
    return loading
  }, [loading])
}

function useButtonChildren(children?: ReactNode) {
  return Children.map(children, (child, index) => {
    if (isTextElement(child)) {
      return <View key={index} className={prefixClassname("button__text")} children={children} />
    }
    if (isIconElement(child)) {
      return cloneIconElement(child, { key: index, className: prefixClassname("button__icon") })
    }
    if (isValidElement(child)) {
      return cloneElement(child, { key: index })
    }
    return child
  })
}

export interface ButtonProps
  extends Omit<TaroButtonProps, "size" | "formType" | "type" | "loading" | "plain"> {
  variant?: ButtonVariant
  shape?: ButtonShape
  size?: ButtonSize
  color?: ButtonColor
  formType?: ButtonFormType
  loading?: boolean | LoadingProps
  block?: boolean
  hairline?: boolean
  disabled?: boolean
  icon?: ReactNode
  children?: ReactNode
}

export default function Button(props: ButtonProps) {
  const {
    className,
    style,
    variant = "contained",
    shape,
    size = "medium",
    color = "default",
    formType = "button",
    block,
    hairline,
    disabled,
    loading: loadingProp,
    icon,
    children: childrenProp,
    onClick,
    ...restProps
  } = props
  const loading = useButtonLoading(loadingProp)
  const children = useButtonChildren(childrenProp)

  const { onClick: onCtxClick } = useContext(ButtonContext)

  return (
    <View
      className={classNames(
        prefixClassname("button"),
        {
          // Set variant style
          [prefixClassname("button--text")]: variant === "text",
          [prefixClassname("button--contained")]: variant === "contained",
          [prefixClassname("button--outlined")]: variant === "outlined",
          // Set color style
          [prefixClassname(`button--${color}`)]: color,
          // Set shape style
          [prefixClassname("button--round")]: shape === "round",
          [prefixClassname("button--square")]: shape === "square",
          // Set size style
          [prefixClassname("button--mini")]: size === "mini",
          [prefixClassname("button--small")]: size === "small",
          [prefixClassname("button--medium")]: size === "medium",
          [prefixClassname("button--large")]: size === "large",
          // Set hairline style
          [prefixClassname("button--hairline")]: hairline,
          [prefixClassname("hairline--surround")]: hairline,
          [prefixClassname("button--disabled")]: disabled,
          [prefixClassname("button--loading")]: loading,
          [prefixClassname("button--block")]: block,
        },
        className,
      )}
      style={style}
      onClick={(e) => {
        if (!disabled && !loading) {
          onClick?.(e)
          onCtxClick?.(e, props)
        }
      }}
    >
      <View className={prefixClassname("button__content")}>
        {loading ?? icon}
        {children}
      </View>
      <ButtonBase
        className={prefixClassname("button__button")}
        formType={formType === "submit" ? "submit" : formType === "reset" ? "reset" : undefined}
        disabled={disabled || !!loading}
        loading={false}
        {...restProps}
      />
    </View>
  )
}

export function createButton(children: ReactNode | ButtonProps, props?: ButtonProps) {
  if (_.isPlainObject(children)) {
    return <Button {...(children as ButtonProps)} {...props} />
  }
  return <Button children={children} {...props} />
}
