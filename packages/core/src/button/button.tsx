import { Button as TaroButton, View } from "@tarojs/components"
import { ITouchEvent } from "@tarojs/components/types/common"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useMemo } from "react"
import Loading, { LoadingType, LoadingTypeString } from "../loading"
import { prefixClassname } from "../styles"

export enum ButtonFormType {
  Button = "button",
  Submit = "submit",
  Reset = "reset",
}

type ButtonFormTypeString = "button" | "submit" | "reset"

export enum ButtonVariant {
  Contained = "contained",
  Text = "text",
  Outlined = "outlined",
}

type ButtonVariantString = "contained" | "text" | "outlined"

export enum ButtonSize {
  Mini = "mini",
  Small = "small",
  Medium = "medium",
  Large = "large",
}

type ButtonSizeString = "mini" | "small" | "medium" | "large"

export enum ButtonColor {
  Default = "default",
  Primary = "primary",
  Info = "info",
  Success = "success",
  Warning = "warning",
  Danger = "danger",
}

type ButtonColorString = "default" | "primary" | "info" | "success" | "warning" | "danger"

const BUTTON_PRESET_COLORS = ["default", "primary", "info", "success", "warning", "danger"]

function isPresetButtonColor(color?: ButtonColor | ButtonColorString | string): boolean {
  return BUTTON_PRESET_COLORS.includes(color as string)
}

export enum ButtonShape {
  Square = "square",
  Circle = "circle",
  Round = "round",
}

type ButtonShapeString = "square" | "circle" | "round"

interface ButtonLoadingProps {
  type?: LoadingType | LoadingTypeString
}

function useButtonLoading(loading?: boolean | ButtonLoadingProps): ButtonLoadingProps | undefined {
  if (_.isBoolean(loading)) {
    return loading ? {} : undefined
  }
  return loading
}

interface ButtonProps {
  className?: string
  variant?: ButtonVariant | ButtonVariantString
  shape?: ButtonShape | ButtonShapeString
  size?: ButtonSize | ButtonSizeString
  color?: ButtonColor | ButtonColorString | string
  formType?: ButtonFormType | ButtonFormTypeString
  loading?: boolean | ButtonLoadingProps
  block?: boolean
  hairline?: boolean
  disabled?: boolean
  icon?: ReactNode
  children?: ReactNode
  // events
  onClick?: (event: ITouchEvent) => void
}

export default function Button(props: ButtonProps) {
  const {
    className,
    variant = ButtonVariant.Contained,
    shape,
    size = ButtonSize.Medium,
    color = ButtonColor.Default,
    formType = ButtonFormType.Button,
    block,
    hairline,
    disabled,
    icon,
    children,
    onClick,
  } = props

  const loadingProps = useButtonLoading(props.loading)

  const rootStyle = useMemo(() => {
    const style: CSSProperties = {}
    if (!isPresetButtonColor(color)) {
      if (variant === ButtonVariant.Contained) {
        style.color = "#fff"
        style.background = color
      } else if (variant === ButtonVariant.Outlined) {
        style.borderColor = color
        style.color = color
      } else {
        style.background = ""
      }
    }
    return style
  }, [color, variant])

  return (
    <View
      className={classNames(
        prefixClassname("button"),
        {
          [prefixClassname("button--disabled")]: disabled,
          [prefixClassname("button--loading")]: loadingProps,
          [prefixClassname("button--block")]: block,
          // Set hairline style
          [prefixClassname("button--hairline")]: hairline,
          [prefixClassname("hairline--surround")]: hairline,
          // Set variant style
          [prefixClassname("button--text")]: variant === ButtonVariant.Text,
          [prefixClassname("button--contained")]: variant === ButtonVariant.Contained,
          [prefixClassname("button--outlined")]: variant === ButtonVariant.Outlined,
          // Set shape style
          [prefixClassname("button--round")]: shape === ButtonShape.Round,
          [prefixClassname("button--square")]: shape === ButtonShape.Square,
          // Set size style
          [prefixClassname("button--mini")]: size === ButtonSize.Mini,
          [prefixClassname("button--small")]: size === ButtonSize.Small,
          [prefixClassname("button--medium")]: size === ButtonSize.Medium,
          [prefixClassname("button--large")]: size === ButtonSize.Large,
          // Set color style
          [prefixClassname(`button--${color}`)]: isPresetButtonColor(color),
          [prefixClassname("button--default")]: !isPresetButtonColor(color),
        },
        className,
      )}
      style={rootStyle}
      onClick={(e) => !loadingProps && onClick?.(e)}
    >
      <View className={prefixClassname("button__content")}>
        {loadingProps ? (
          <Loading className={prefixClassname("button__loading")} {...loadingProps} />
        ) : (
          icon
        )}
        {children && <View className={prefixClassname("button__text")} children={children} />}
      </View>
      <TaroButton
        formType={
          formType === ButtonFormType.Submit
            ? "submit"
            : formType === ButtonFormType.Reset
            ? "reset"
            : undefined
        }
      />
    </View>
  )
}
