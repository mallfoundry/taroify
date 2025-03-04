import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import type { PropsWithChildren } from "react"
import { prefixClassname } from "../styles"
import TimelineContext from "./timeline.context"
import type { TimelinePosition } from "./timeline.shared"

export interface TimelineProps extends PropsWithChildren<ViewProps> {
  position?: TimelinePosition
}
function Timeline(props: TimelineProps) {
  const { className, position, ...restProps } = props

  return (
    <TimelineContext.Provider
      value={{
        position,
      }}
    >
      <View className={classNames(prefixClassname("timeline"), className)} {...restProps} />
    </TimelineContext.Provider>
  )
}

export default Timeline
