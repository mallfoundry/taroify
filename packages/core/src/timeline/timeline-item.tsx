import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, Children, cloneElement, ReactElement } from "react"
import { prefixClassname } from "../styles"
import { algin } from "./timeline.shared"
import "./timeline-item.scss"
import { TimeLineLineProps } from "./timeline-line"

export interface TimeLineItemProps extends ViewProps {
  algin?: algin
  bullet?: JSX.Element
  title?: string
  children?: ReactNode
  className?: string
  active?: boolean
}

function useTimelineItemComponent(
  children: ReactElement<TimeLineLineProps>,
  algin: algin | undefined,
  active: boolean,
) {
  return Children.toArray(children).map((child: any) => {
    if (child.type.displayName === "TimeLineLine") {
      return cloneElement(child, { algin, active })
    }

    return cloneElement(child, { algin })
  })
}
function TimeLineItem(props: TimeLineItemProps) {
  const { children, algin, className, active = false } = props

  const TimelineLine = useTimelineItemComponent(
    children as ReactElement<TimeLineLineProps>,
    algin,
    active,
  )
  return (
    <View
      className={classNames(
        prefixClassname("timeline-item"),
        {
          [prefixClassname("timeline-item-right")]: algin === "right",
        },
        className,
      )}
    >
      {TimelineLine}
    </View>
  )
}

export default TimeLineItem
