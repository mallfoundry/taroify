import { Cross } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface UploaderRemoveProps {
  className?: string
  icon?: ReactNode

  onClick?(event: ITouchEvent): void
}

function UploaderRemove(props: UploaderRemoveProps) {
  const { className, icon = <Cross />, onClick } = props

  function handleClick(event: ITouchEvent) {
    onClick?.(event)
  }

  return (
    <View
      className={classNames(prefixClassname("uploader__preview-remove"), className)}
      onClick={handleClick}
    >
      {cloneIconElement(icon, { className: prefixClassname("uploader__preview-remove-icon") })}
    </View>
  )
}

export default UploaderRemove
