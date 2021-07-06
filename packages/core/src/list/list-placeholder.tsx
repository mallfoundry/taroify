import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface ListPlaceholderProps extends ViewProps {
  children?: ReactNode
}

function ListPlaceholder(props: ListPlaceholderProps) {
  const { className, children, ...restProps } = props

  return (
    <View
      className={classNames(prefixClassname("list__placeholder"), className)}
      children={children}
      {...restProps}
    />
  )
}

export default ListPlaceholder
