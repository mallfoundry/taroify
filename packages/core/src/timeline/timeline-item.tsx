import { ViewProps } from "@tarojs/components/types/View"
import * as React from "react"
import { ReactNode } from "react"
import { PropsWithChildren } from "react"
import { shape,direction } from "./timeline.shared"
import TimelineItemBase from "./timeline-item-base"
import TimelineContent from "./timeline-content"
import TimelineSeparator from "./timeline-separator"
import TimelineConnector from "./timeline-connector"

export interface TimeLineItemProps extends PropsWithChildren<ViewProps> {
  icon?: ReactNode
  algin?: boolean
  color?: string
  size?:string
  shape?:shape
  direction?:direction
}

function TimeLineItem(props: TimeLineItemProps) {
  const { direction,shape,size,algin, color, icon, children, ...restProps } = props;
  
  return (
    <TimelineItemBase {...restProps}>
      <TimelineContent children={algin ? children : undefined} />
      <TimelineSeparator>
        <TimelineConnector color={direction !=="bottom"?color:undefined} size={size} shape={shape}/>
        {icon}
        <TimelineConnector color={direction !=="top"?color:undefined} size={size} shape={shape} />
      </TimelineSeparator>
      <TimelineContent children={!algin ? children : undefined} />
    </TimelineItemBase>
  )
}

export default TimeLineItem
