import { ViewProps } from "@tarojs/components/types/View"
import * as React from "react"
import { PropsWithChildren, ReactNode } from "react"
import { prefixClassname } from "../styles"
import TimelineItemBase from "./timeline-item-base"
import TimelineContent from "./timeline-content"
import TimelineSeparator from "./timeline-separator"
import TimelineConnector from "./timeline-connector"

export interface TimeLineItemProps extends PropsWithChildren<ViewProps> {
  icon?: ReactNode
  align?: boolean
}

function TimeLineItem(props: TimeLineItemProps) {
  const { align, icon, children, ...restProps } = props

  return (
    <TimelineItemBase {...restProps}>
      <TimelineContent children={align ? children : undefined} />
      <TimelineSeparator>
        <TimelineConnector className={prefixClassname("timeline-connector--top")} />
        {icon}
        <TimelineConnector className={prefixClassname("timeline-connector--bottom")} />
      </TimelineSeparator>
      <TimelineContent children={!align ? children : undefined} />
    </TimelineItemBase>
  )
}

export default TimeLineItem
