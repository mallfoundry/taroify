import { cloneIconElement, isIconElement } from "@taroify/icons/utils"
import { ButtonProps as TaroButtonProps, View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { cloneElement, ReactElement, ReactNode, useContext, useMemo } from "react"
import ButtonBase from "../button-base"
import Loading, { LoadingProps } from "../loading"
import { prefixClassname } from "../styles"
import Children from "../utils/children"
import { isElementOf, isObjectElement } from "../utils/validate"
import ButtonContent from "./button-content"
import ButtonContext from "./button.context"
import {
  ButtonColor,
  ButtonFormType,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from "./button.shared"

function useButtonLoading(loading?: boolean | LoadingProps | ReactElement): ReactNode {
  return useMemo(() => {
    if (_.isBoolean(loading) && loading) {
      return (
        <Loading
          className={classNames(
            prefixClassname("button__loading"),
            prefixClassname("button__loading--right"),
          )}
        />
      )
    }

    if (isObjectElement(loading)) {
      const { className, ...restProps } = loading as LoadingProps
      return (
        <Loading
          className={classNames(
            prefixClassname("button__loading"),
            prefixClassname("button__loading--right"),
            className,
          )}
          {...restProps}
        />
      )
    }

    if (isElementOf(loading, Loading)) {
      return cloneElement(loading as ReactElement, {
        className: classNames(
          prefixClassname("button__loading"),
          prefixClassname("button__loading--right"),
        ),
      })
    }

    return loading
  }, [loading])
}

function appendButtonIconClassname(icon?: ReactNode, className?: string) {
  return isIconElement(icon) ? cloneIconElement(icon, { className }) : icon
}

interface UseButtonChildrenOptions {
  children?: ReactNode
  loading?: ReactNode
  icon?: ReactNode
}

function useButtonChildren(options: UseButtonChildrenOptions = {}) {
  const { loading, icon: iconProp, children } = options
  if (isElementOf(children, ButtonContent)) {
    return children
  }
  const childrenArray = Children.toArray(children)
  const lastIndex = _.size(childrenArray) - 1

  const icon = appendButtonIconClassname(iconProp, prefixClassname("button__icon--right"))
  return (
    <ButtonContent>
      {loading || icon}
      {
        //
        _.map(childrenArray, (child, index) => {
          if (isIconElement(child) && index === 0) {
            return appendButtonIconClassname(child, prefixClassname("button__icon--right"))
          }
          if (isIconElement(child) && index === lastIndex) {
            return appendButtonIconClassname(child, prefixClassname("button__icon--left"))
          }
          return child
        })
      }
    </ButtonContent>
  )
}

export interface ButtonProps
  extends Omit<TaroButtonProps, "size" | "formType" | "type" | "loading" | "plain"> {
  variant?: ButtonVariant
  shape?: ButtonShape
  size?: ButtonSize
  color?: ButtonColor
  formType?: ButtonFormType
  loading?: boolean | LoadingProps | ReactElement
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
  const children = useButtonChildren({ children: childrenProp, loading, icon })

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
      {children}
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
