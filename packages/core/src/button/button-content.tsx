import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { PropsWithChildren } from "react"
import { prefixClassname } from "../styles"

interface ButtonContentProps extends PropsWithChildren<ViewProps> {}

function ButtonContent(props: ButtonContentProps) {
  const { className, ...restProps } = props
  return (
    <View className={classNames(prefixClassname("button__content"), className)} {...restProps} />
  )
}

export default ButtonContent
