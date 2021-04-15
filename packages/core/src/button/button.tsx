import * as React from "react"
import { ReactNode } from "react"
import classNames from "classnames"
import { prefixClassname } from "../styles"
import { Button as TaroButton, View } from "@tarojs/components"
import { ITouchEvent } from "@tarojs/components/types/common"

export enum ButtonFormType {
  Button = "button",
  Submit = "submit",
  Reset = "reset"
}

type ButtonFormTypeString = "button" | "submit" | "reset"

export enum ButtonVariant {
  Contained = "contained",
  Text = "text",
  Outlined = "outlined"
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
  Danger = "danger"
}

type ButtonColorString = "default" | "primary" | "info" | "success" | "warning" | "danger"

export enum ButtonShape {
  Square = "square",
  Circle = "circle",
  Round = "round",
}

type ButtonShapeString = "square" | "circle" | "round"

interface ButtonProps {
  variant?: ButtonVariant | ButtonVariantString
  shape?: ButtonShape | ButtonShapeString
  size?: ButtonSize | ButtonSizeString
  color?: ButtonColor | ButtonColorString
  formType?: ButtonFormType | ButtonFormTypeString
  block?: boolean
  hairline?: boolean
  disabled?: boolean
  startIcon?: ReactNode
  children?: ReactNode
  // events
  onClick?: (event: ITouchEvent) => void
}

export default function Button(props: ButtonProps) {
  const {
    variant = ButtonVariant.Contained,
    shape,
    size = ButtonSize.Medium,
    color = ButtonColor.Default,
    formType = ButtonFormType.Button,
    block,
    hairline,
    disabled,
    startIcon,
    children,
    onClick,
  } = props

  return (
    <View
      className={classNames(
        prefixClassname("button"),
        {
          [prefixClassname("button--disabled")]: disabled,
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
          // Set size style
          [prefixClassname("button--mini")]: size === ButtonSize.Mini,
          [prefixClassname("button--small")]: size === ButtonSize.Small,
          [prefixClassname("button--medium")]: size === ButtonSize.Medium,
          [prefixClassname("button--large")]: size === ButtonSize.Large,
          // Set color style
          [prefixClassname("button--default")]: color === ButtonColor.Default,
          [prefixClassname("button--primary")]: color === ButtonColor.Primary,
          [prefixClassname("button--info")]: color === ButtonColor.Info,
          [prefixClassname("button--success")]: color === ButtonColor.Success,
          [prefixClassname("button--warning")]: color === ButtonColor.Warning,
          [prefixClassname("button--danger")]: color === ButtonColor.Danger,
        })}
      onClick={onClick}
    >
      <TaroButton
        formType={formType === ButtonFormType.Submit ? "submit" : (formType === ButtonFormType.Reset ? "reset" : undefined)}
      />
      <View
        className={prefixClassname("button__content")}>
        {startIcon}
        {children && <View className={prefixClassname("button__text")} children={children} />}
      </View>
    </View>
  )
}
