import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface CellBriefProps extends ViewProps {
  children: ReactNode
}

function CellBrief(props: CellBriefProps) {
  const { className, ...restProps } = props
  return <View className={classNames(prefixClassname("cell__brief"), className)} {...restProps} />
}

export default CellBrief
