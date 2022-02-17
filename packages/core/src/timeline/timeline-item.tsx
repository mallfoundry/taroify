import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, Children, cloneElement, ReactElement } from "react"
import { prefixClassname } from "../styles"
import { algin } from "./timeline.shared"
import "./timeline-item.scss"
import TimeLineContent from "./timeline-content"

export interface TimeLineItemProps extends ViewProps {
  algin?: algin
  bullet?: JSX.Element
  title?: string
  children?: ReactNode
  className?: string
  active?: boolean
}
function useTimeLineContentCompoents(children: ReactNode) {
  const TimeLineContentCompoents: any = {
    leftChild: <TimeLineContent />,
    rightChild: <TimeLineContent />,
  }
  Children.forEach(children, (child: any) => {
    if (child.props.algin === "left") {
      TimeLineContentCompoents.leftChild = cloneElement(child, {})
    } else if (child.props.algin === "right") {
      TimeLineContentCompoents.rightChild = child
    } else {
      TimeLineContentCompoents.lineChild = child
    }
  })
  return TimeLineContentCompoents
}
function useTimelineItemComponent(children: ReactNode, algin: algin | undefined) {
  return Children.toArray(children).map((child) => {
    return cloneElement(child as ReactElement, { algin })
  })
}
function TimeLineItem(props: TimeLineItemProps) {
  const { children, algin, className } = props
  const { leftChild, rightChild, lineChild }: any = useTimeLineContentCompoents(children)
  const TimelineLine = useTimelineItemComponent(children, algin)
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
      {!algin && (
        <>
          {!algin && leftChild}
          {lineChild}
          {rightChild}
        </>
      )}
      {algin && TimelineLine}
    </View>
  )
}

export default TimeLineItem
