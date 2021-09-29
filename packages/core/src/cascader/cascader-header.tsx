import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import CascaderContext from "./cascader.context"

interface CascaderHeaderProps {
  className?: string
  children?: ReactNode
}

function CascaderHeader(props: CascaderHeaderProps) {
  const { className, children } = props
  const { title, closeable, closeIcon, onClose } = useContext(CascaderContext)
  return (
    <View className={classNames(prefixClassname("cascader__header"), className)}>
      {children ?? <View className={prefixClassname("cascader__title")} children={title} />}
      {closeable &&
        cloneIconElement(closeIcon, {
          className: prefixClassname("cascader__close-icon"),
          onClick: onClose,
        })}
    </View>
  )
}

export default CascaderHeader
