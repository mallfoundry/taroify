import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { createContext, PropsWithChildren } from "react"
import { prefixClassname } from "../styles"

export interface TimeLineProps extends PropsWithChildren<ViewProps> {
  size?: string
}
export const TimeLineContext = createContext<any>({})
function TimeLine(props: TimeLineProps) {
  const { className, size, ...restProps } = props

  return (
    <TimeLineContext.Provider value={size}>
      <View className={classNames(prefixClassname("timeline"), className)} {...restProps} />
    </TimeLineContext.Provider>
  )
}

export default TimeLine
