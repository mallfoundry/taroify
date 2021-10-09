import { Button as TaroButton, ButtonProps as TaroButtonProps, View } from "@tarojs/components"
import { CommonEventFunction, ITouchEvent } from "@tarojs/components/types/common"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useMemo } from "react"
import Loading, { LoadingType } from "../loading"
import { prefixClassname } from "../styles"

import {
  ButtonColor,
  ButtonFormType,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from "./button.shared"

const BUTTON_PRESET_COLORS = ["default", "primary", "info", "success", "warning", "danger"]

function isPresetButtonColor(color?: ButtonColor | string): boolean {
  return BUTTON_PRESET_COLORS.includes(color as string)
}

interface ButtonLoadingProps {
  type?: LoadingType
}

function useButtonLoading(loading?: boolean | ButtonLoadingProps): ButtonLoadingProps | undefined {
  if (_.isBoolean(loading)) {
    return loading ? {} : undefined
  }
  return loading
}

export interface ButtonProps {
  className?: string
  // style?: CSSProperties
  variant?: ButtonVariant
  shape?: ButtonShape
  size?: ButtonSize
  color?: ButtonColor | string
  formType?: ButtonFormType
  loading?: boolean | ButtonLoadingProps
  block?: boolean
  hairline?: boolean
  disabled?: boolean
  icon?: ReactNode
  children?: ReactNode
  // miniprogram props
  openType?: TaroButtonProps.openType | string
  hoverStopPropagation?: boolean
  hoverStartTime?: number
  hoverStayTime?: number
  lang?: TaroButtonProps.lang
  sessionFrom?: string
  sendMessageTitle?: string
  sendMessagePath?: string
  sendMessageImg?: string
  appParameter?: string
  businessId?: string
  scope?: "userInfo" | "phoneNumber"
  showMessageCard?: boolean
  // events
  onClick?: (event: ITouchEvent) => void
  // miniprogram events
  onGetUserInfo?: CommonEventFunction<TaroButtonProps.onGetUserInfoEventDetail>
  onGetAuthorize?: CommonEventFunction
  onContact?: CommonEventFunction<TaroButtonProps.onContactEventDetail>
  onGetPhoneNumber?: CommonEventFunction<TaroButtonProps.onGetPhoneNumberEventDetail>
  onGetRealnameAuthInfo?: CommonEventFunction
  onError?: CommonEventFunction
  onOpenSetting?: CommonEventFunction<TaroButtonProps.onOpenSettingEventDetail>
  onLaunchapp?: CommonEventFunction
}

export default function Button(props: ButtonProps) {
  const {
    className,
    variant = "contained",
    shape,
    size = "medium",
    color = "default",
    formType = "button",
    block,
    hairline,
    disabled,
    icon,
    children,
    openType,
    hoverStopPropagation,
    hoverStartTime,
    hoverStayTime,
    sessionFrom,
    sendMessageTitle,
    sendMessagePath,
    sendMessageImg,
    appParameter,
    businessId,
    scope,
    showMessageCard,
    onClick,
    onGetUserInfo,
    onGetAuthorize,
    onContact,
    onGetPhoneNumber,
    onGetRealnameAuthInfo,
    onError,
    onOpenSetting,
    onLaunchapp,
  } = props

  const loadingProps = useButtonLoading(props.loading)

  const rootStyle = useMemo(() => {
    const style: CSSProperties = {}
    if (!isPresetButtonColor(color)) {
      if (variant === "contained") {
        style.color = "#fff"
        style.background = color
      } else if (variant === "outlined") {
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
          // Set variant style
          [prefixClassname("button--text")]: variant === "text",
          [prefixClassname("button--contained")]: variant === "contained",
          [prefixClassname("button--outlined")]: variant === "outlined",
          // Set color style
          [prefixClassname(`button--${color}`)]: isPresetButtonColor(color),
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
          [prefixClassname("button--loading")]: loadingProps,
          [prefixClassname("button--block")]: block,
        },
        className,
      )}
      style={rootStyle}
      onClick={(e) => !disabled && !loadingProps && onClick?.(e)}
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
        className={prefixClassname("button__button")}
        formType={formType === "submit" ? "submit" : formType === "reset" ? "reset" : undefined}
        disabled={disabled}
        openType={openType}
        hoverStopPropagation={hoverStopPropagation}
        hoverStartTime={hoverStartTime}
        hoverStayTime={hoverStayTime}
        sessionFrom={sessionFrom}
        sendMessageTitle={sendMessageTitle}
        sendMessagePath={sendMessagePath}
        sendMessageImg={sendMessageImg}
        appParameter={appParameter}
        businessId={businessId}
        scope={scope}
        showMessageCard={showMessageCard}
        onGetUserInfo={onGetUserInfo}
        onGetAuthorize={onGetAuthorize}
        onContact={onContact}
        onGetPhoneNumber={onGetPhoneNumber}
        onGetRealnameAuthInfo={onGetRealnameAuthInfo}
        onError={onError}
        onOpenSetting={onOpenSetting}
        onLaunchapp={onLaunchapp}
      />
    </View>
  )
}
