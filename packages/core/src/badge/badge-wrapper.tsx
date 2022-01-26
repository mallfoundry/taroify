import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import { prefixClassname } from "../styles"
import BadgeWrapperContext from "./badge-wrapper.context"

export interface BadgeWrapperProps extends ViewProps {
  style?: CSSProperties
  children?: ReactNode
}

function BadgeWrapper(props: BadgeWrapperProps) {
  const { className, ...restProps } = props

  return (
    <BadgeWrapperContext.Provider value={{}}>
      <View className={classNames(prefixClassname("badge-wrapper"), className)} {...restProps} />
    </BadgeWrapperContext.Provider>
  )
}

export default BadgeWrapper
