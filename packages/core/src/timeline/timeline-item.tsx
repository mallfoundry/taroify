import { ViewProps } from "@tarojs/components/types/View"
import * as React from "react"
import { PropsWithChildren, ReactNode } from "react"
import { direction, shape } from "./timeline.shared"
import TimelineItemBase from "./timeline-item-base"
import TimelineContent from "./timeline-content"
import TimelineSeparator from "./timeline-separator"
import TimelineConnector from "./timeline-connector"

export interface TimeLineItemProps extends PropsWithChildren<ViewProps> {
  icon?: ReactNode
  align?: boolean
  color?: string
  size?: string
  shape?: shape
  direction?: direction
}

function TimeLineItem(props: TimeLineItemProps) {
  const { direction, shape, size, align, color, icon, children, ...restProps } = props

  return (
    <TimelineItemBase {...restProps}>
      <TimelineContent children={align ? children : undefined} />
      <TimelineSeparator>
        <TimelineConnector color={direction !== "bottom" ? color : undefined} size={size} shape={shape} />
        {icon}
        <TimelineConnector color={direction !== "top" ? color : undefined} size={size} shape={shape} />
      </TimelineSeparator>
      <TimelineContent children={!align ? children : undefined} />
    </TimelineItemBase>
  )
}

export default TimeLineItem
