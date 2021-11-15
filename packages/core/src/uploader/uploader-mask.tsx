import { cloneIconElement, isIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { cloneElement, isValidElement, ReactElement, ReactNode } from "react"
import Loading from "../loading"
import { prefixClassname } from "../styles"

function renderIcon(icon?: ReactNode) {
  if (isIconElement(icon)) {
    return cloneIconElement(icon, { className: prefixClassname("uploader__mask-icon") })
  }
  if (isValidElement(icon) && (icon as ReactElement).type === Loading) {
    const { className } = (icon as ReactElement).props
    return cloneElement(icon, {
      className: classNames(prefixClassname("uploader__loading"), className),
    })
  }
}

interface UploaderMaskProps {
  className?: string
  icon?: ReactNode
  message?: ReactNode
}

function UploaderMask(props: UploaderMaskProps) {
  const { className, icon, message } = props
  return (
    <View className={classNames(prefixClassname("uploader__mask"), className)}>
      {renderIcon(icon)}
      {message && <View className={prefixClassname("uploader__mask-message")} children={message} />}
    </View>
  )
}

export default UploaderMask
