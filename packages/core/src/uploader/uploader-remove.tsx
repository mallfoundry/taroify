import { Cross } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface UploaderRemoveProps extends ViewProps {
  className?: string
  icon?: ReactNode
}

function UploaderRemove(props: UploaderRemoveProps) {
  const { className, icon = <Cross />, ...restProps } = props

  return (
    <View
      className={classNames(prefixClassname("uploader__preview-remove"), className)}
      {...restProps}
    >
      {cloneIconElement(icon, { className: prefixClassname("uploader__preview-remove-icon") })}
    </View>
  )
}

export default UploaderRemove
