import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { PropsWithChildren, useContext } from "react"
import { prefixClassname } from "../styles"
import { TimeLineContext } from "./timeline"
import { shape } from "./timeline.shared"

interface TimelineConnectorProps extends PropsWithChildren<ViewProps> {
  color?: string
  size?: string
  shape?: shape
}

function TimelineConnector(props: TimelineConnectorProps) {
  const { shape, size, color, className, ...restProps } = props

  const resSize = useContext(TimeLineContext)

  return (
    <View
      className={classNames(prefixClassname("timeline-connector"), className)}
      style={{
        borderRightColor: color,
        borderRightWidth: resSize || size,
        borderRightStyle: shape,
      }}
      {...restProps}
    />
  )
}

export default TimelineConnector
