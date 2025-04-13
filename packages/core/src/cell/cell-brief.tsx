import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import type { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface CellBriefProps extends ViewProps {
  children: ReactNode
  briefClass?: string
}

function CellBrief(props: CellBriefProps) {
  const { className, briefClass, ...restProps } = props
  return (
    <View
      className={classNames(prefixClassname("cell__brief"), className, briefClass)}
      {...restProps}
    />
  )
}

export default CellBrief
