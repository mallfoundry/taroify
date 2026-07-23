import { cloneIconElement, isIconElement } from "@taroify/icons/utils"
import { type ButtonProps as TaroButtonProps, View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  cloneElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  useContext,
  useMemo,
} from "react"
import ButtonBase from "../button-base"
import Loading, { type LoadingProps } from "../loading"
import { prefixClassname } from "../styles"
import Children from "../utils/children"
import { isElementOf, isObjectElement } from "../utils/validate"
import ButtonContent from "./button-content"
import ButtonGroupContext from "./button-group.context"
import ButtonContext from "./button.context"
import type {
  ButtonColor,
  ButtonFormType,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
  IconPosition,
} from "./button.shared"
import { isButtonPresetColor } from "./button.shared"

interface ButtonLoadingState {
  active: boolean
  icon?: ReactNode
}

function useButtonLoading(loading?: boolean | LoadingProps | ReactElement): ButtonLoadingState {
  return useMemo(() => {
    const active = Boolean(loading)
    const loadingClassName = classNames(
      prefixClassname("button__loading"),
      prefixClassname("button__loading--right"),
    )

    if (_.isBoolean(loading) && loading) {
      return { active, icon: <Loading className={loadingClassName} /> }
    }

    if (isObjectElement(loading as ReactNode)) {
      const { className, ...restProps } = loading as LoadingProps
      return {
        active,
        icon: <Loading className={classNames(loadingClassName, className)} {...restProps} />,
      }
    }

    if (isElementOf(loading as ReactNode, Loading)) {
      const element = loading as ReactElement<LoadingProps>
      return {
        active,
        icon: cloneElement(loading as ReactElement, {
          className: classNames(loadingClassName, element.props.className),
        }),
      }
    }

    if (React.isValidElement(loading)) {
      return {
        active,
        icon: <View className={loadingClassName}>{loading}</View>,
      }
    }

    return { active }
  }, [loading])
}

function renderButtonIcon(icon?: ReactNode, className?: string) {
  if (icon === undefined || icon === null || _.isBoolean(icon)) {
    return null
  }

  const iconClassName = classNames(prefixClassname("button__icon"), className)
  return isIconElement(icon) ? (
    cloneIconElement(icon, { className: iconClassName })
  ) : (
    <View className={iconClassName}>{icon}</View>
  )
}

interface UseButtonChildrenOptions {
  children?: ReactNode
  loading: ButtonLoadingState
  loadingText?: ReactNode
  icon?: ReactNode
  iconPosition?: IconPosition
}

function useButtonChildren(options: UseButtonChildrenOptions) {
  const { loading, loadingText, icon: iconProp, children, iconPosition } = options
  if (isElementOf(children, ButtonContent)) {
    if (!loading.active) {
      return children
    }

    const content = children as ReactElement<{ children?: ReactNode }>
    return cloneElement(
      content,
      undefined,
      loading.icon,
      loadingText !== undefined ? loadingText : content.props.children,
    )
  }

  const content = loading.active && loadingText !== undefined ? loadingText : children
  const childrenArray = Children.toArray(content)
  const lastIndex = _.size(childrenArray) - 1

  const icon = loading.active
    ? null
    : renderButtonIcon(
        iconProp,
        prefixClassname(iconPosition === "left" ? "button__icon--right" : "button__icon--left"),
      )
  return (
    <ButtonContent>
      {loading.icon}
      {iconPosition === "left" && icon}
      {
        //
        _.map(childrenArray, (child, index) => {
          if (isIconElement(child) && index === 0) {
            return renderButtonIcon(child, prefixClassname("button__icon--right"))
          }
          if (isIconElement(child) && index === lastIndex) {
            return renderButtonIcon(child, prefixClassname("button__icon--left"))
          }
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <View key={index} className={prefixClassname("button__text")}>
              {child}
            </View>
          )
        })
      }
      {iconPosition === "right" && icon}
    </ButtonContent>
  )
}

function resolveButtonPropertyValue<T>(value1?: T, value2?: T, defaultValue?: T) {
  return value1 ?? value2 ?? defaultValue
}

function getButtonTextContent(node?: ReactNode): string {
  if (_.isString(node) || _.isNumber(node)) {
    return String(node)
  }
  if (_.isArray(node)) {
    return _.map(node, getButtonTextContent).join("")
  }
  if (React.isValidElement<{ children?: ReactNode }>(node)) {
    return getButtonTextContent(node.props.children)
  }
  return ""
}

function getButtonStyle(
  style: TaroButtonProps["style"],
  customColor?: string,
): TaroButtonProps["style"] {
  if (!customColor) {
    return style
  }

  if (_.isString(style)) {
    return `--button-custom-color: ${customColor};${style}`
  }

  return {
    "--button-custom-color": customColor,
    ...style,
  } as CSSProperties
}

export interface ButtonProps
  extends Omit<TaroButtonProps, "size" | "formType" | "type" | "loading" | "plain"> {
  variant?: ButtonVariant
  shape?: ButtonShape
  size?: ButtonSize
  color?: ButtonColor
  formType?: ButtonFormType
  loading?: boolean | LoadingProps | ReactElement
  loadingText?: ReactNode
  block?: boolean
  hairline?: boolean
  disabled?: boolean
  icon?: ReactNode
  iconPosition?: IconPosition
  children?: ReactNode
}

export default function Button(props: ButtonProps) {
  const {
    className,
    style,
    hidden,
    animation,
    hoverClass,
    hoverStyle,
    hoverStopPropagation,
    hoverStartTime,
    hoverStayTime,
    ariaLabel,
    variant: variantProp,
    shape: shapeProp,
    size: sizeProp,
    color: colorProp,
    formType = "button",
    block,
    hairline: hairlineProp,
    disabled: disabledProp,
    loading: loadingProp,
    loadingText,
    icon,
    iconPosition = "left",
    children: childrenProp,
    onClick,
    ...restProps
  } = props
  const {
    variant: variantCtx,
    shape: shapeCtx,
    size: sizeCtx,
    color: colorCtx,
    hairline: hairlineCtx,
    disabled: disabledCtx,
  } = useContext(ButtonGroupContext)
  const { onClick: onCtxClick } = useContext(ButtonContext)
  const variant = resolveButtonPropertyValue(variantProp, variantCtx, "contained")
  const shape = resolveButtonPropertyValue(shapeProp, shapeCtx)
  const size = resolveButtonPropertyValue(sizeProp, sizeCtx, "medium")
  const color = resolveButtonPropertyValue(colorProp, colorCtx, "default")
  const hairline = resolveButtonPropertyValue(hairlineProp, hairlineCtx)
  const disabled = resolveButtonPropertyValue(disabledProp, disabledCtx)

  const loading = useButtonLoading(loadingProp)
  const children = useButtonChildren({
    children: childrenProp,
    loading,
    loadingText,
    icon,
    iconPosition,
  })
  const presetColor = color && isButtonPresetColor(color) ? color : undefined
  const customColor = color && !presetColor ? color : undefined
  const buttonStyle = getButtonStyle(style, customColor)
  const accessibilityContent =
    loading.active && loadingText !== undefined ? loadingText : childrenProp
  const accessibilityLabel = ariaLabel ?? (getButtonTextContent(accessibilityContent) || undefined)

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
          [prefixClassname(`button--${presetColor}`)]: presetColor,
          [prefixClassname("button--custom")]: customColor,
          [prefixClassname("button--gradient")]: customColor && /gradient/i.test(customColor),
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
          [prefixClassname("button--loading")]: loading.active,
          [prefixClassname("button--block")]: block,
        },
        className,
      )}
      style={buttonStyle}
      hidden={hidden}
      animation={animation}
      hoverClass={hoverClass}
      hoverStyle={hoverStyle}
      hoverStopPropagation={hoverStopPropagation}
      hoverStartTime={hoverStartTime}
      hoverStayTime={hoverStayTime}
      onClick={(e) => {
        if (!disabled && !loading.active) {
          onClick?.(e)
          onCtxClick?.(e, props)
        }
      }}
    >
      {children}
      <ButtonBase
        className={prefixClassname("button__button")}
        formType={formType === "submit" ? "submit" : formType === "reset" ? "reset" : undefined}
        disabled={disabled || loading.active}
        loading={false}
        ariaLabel={accessibilityLabel}
        {...restProps}
      />
    </View>
  )
}

export function createButton(children: ReactNode | ButtonProps, props?: ButtonProps) {
  if (_.isPlainObject(children)) {
    return <Button {...(children as ButtonProps)} {...props} />
  }
  return <Button children={children as ReactNode} {...props} />
}
