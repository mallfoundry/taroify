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
  Circle = "circle",
  Round = "round",
}

type ButtonShapeString = "circle" | "round"

interface ButtonProps {
  variant?: ButtonVariant | ButtonVariantString
  shape?: ButtonShape | ButtonShapeString
  size?: ButtonSize | ButtonSizeString
  color?: ButtonColor | ButtonColorString
  block?: boolean
  formType?: ButtonFormType
  children?: ReactNode
  // events
  onClick?: (event: ITouchEvent) => void
}

export default function Button(props: ButtonProps) {

  const {
    variant = ButtonVariant.Text,
    shape,
    size = ButtonSize.Medium,
    color = ButtonColor.Default,
    formType = ButtonFormType.Button,
    children,
    onClick,
  } = props

  return (
    <View
      className={classNames(
        prefixClassname("button"),
        {
          // Set variant style
          [prefixClassname("button-variant-text")]: variant === ButtonVariant.Text,
          [prefixClassname("button-variant-contained")]: variant === ButtonVariant.Contained,
          [prefixClassname("button-variant-outlined")]: variant === ButtonVariant.Outlined,
          // Set shape style
          [prefixClassname("button-shape-round")]: shape === ButtonShape.Round,
          // Set size style
          [prefixClassname("button-size-mini")]: size === ButtonSize.Mini,
          [prefixClassname("button-size-small")]: size === ButtonSize.Small,
          [prefixClassname("button-size-medium")]: size === ButtonSize.Medium,
          [prefixClassname("button-size-large")]: size === ButtonSize.Large,
          // Set color style
          [prefixClassname("button-color-default")]: color === ButtonColor.Default,
          [prefixClassname("button-color-primary")]: color === ButtonColor.Primary,
          [prefixClassname("button-color-info")]: color === ButtonColor.Info,
          [prefixClassname("button-color-success")]: color === ButtonColor.Success,
          [prefixClassname("button-color-warning")]: color === ButtonColor.Warning,
          [prefixClassname("button-color-danger")]: color === ButtonColor.Danger,
        })}
      onClick={onClick}
    >
      <TaroButton
        formType={formType === ButtonFormType.Submit ? "submit" : (formType === ButtonFormType.Reset ? "reset" : undefined)}
      />
      <View
        className={prefixClassname("button-content")}>
        {children}
      </View>
    </View>
  )
}
