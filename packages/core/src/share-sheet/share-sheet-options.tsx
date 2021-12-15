import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface ShareSheetOptionsProps extends ViewProps {
  children?: ReactNode
}

export default function ShareSheetOptions(props: ShareSheetOptionsProps) {
  const { className, ...restProps } = props
  return (
    <View
      className={classNames(prefixClassname("share-sheet__options"), className)}
      {...restProps}
    />
  )
}
