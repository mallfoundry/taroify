import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface CalendarFooterProps extends ViewProps {
  children?: ReactNode
}

function CalendarFooter(props: CalendarFooterProps) {
  const { className, ...restProps } = props
  return (
    <View className={classNames(prefixClassname("calendar__footer"), className)} {...restProps} />
  )
}

export default CalendarFooter
