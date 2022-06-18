import { ButtonProps } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import { useMemo } from "react"

export default function useSheetProps<P>(props: ButtonProps & ViewProps & P): [ButtonProps, P] {
  return useMemo(() => {
    const {
      size,
      type,
      plain,
      disabled,
      loading,
      formType,
      openType,
      hoverClass,
      hoverStyle,
      hoverStopPropagation,
      hoverStartTime,
      hoverStayTime,
      lang,
      sessionFrom,
      sendMessageTitle,
      sendMessagePath,
      sendMessageImg,
      appParameter,
      businessId,
      scope,
      showMessageCard,
      onGetUserInfo,
      onGetAuthorize,
      onContact,
      onGetPhoneNumber,
      onError,
      onOpenSetting,
      ...restProps
    } = props
    const buttonProps = {
      size,
      type,
      plain,
      disabled,
      loading,
      formType,
      openType,
      hoverClass,
      hoverStyle,
      hoverStopPropagation,
      hoverStartTime,
      hoverStayTime,
      lang,
      sessionFrom,
      sendMessageTitle,
      sendMessagePath,
      sendMessageImg,
      appParameter,
      businessId,
      scope,
      showMessageCard,
      onGetUserInfo,
      onGetAuthorize,
      onContact,
      onGetPhoneNumber,
      onError,
      onOpenSetting,
    }
    return [buttonProps, restProps as P]
  }, [props])
}
