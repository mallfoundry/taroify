import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface SearchLabelProps extends ViewProps {
  children?: ReactNode
}

function SearchLabel(props: SearchLabelProps) {
  const { className, ...restProps } = props
  return <View className={classNames(prefixClassname("search__label"), className)} {...restProps} />
}

export default SearchLabel
