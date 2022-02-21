import { ViewProps } from "@tarojs/components/types/View"
import * as React from "react"
import { PropsWithChildren, ReactNode, Children, useContext } from "react"
import * as _ from "lodash"
import { SettingOutlined } from "@taroify/icons"
import classNames from "classnames"
import { prefixClassname } from "../styles"
import { isElementOf } from "../utils/validate"
import TimelineItemBase from "./timeline-item-base"
import TimelineContent from "./timeline-content"
import TimelineSeparator from "./timeline-separator"
import TimelineConnector from "./timeline-connector"
import { TimelinePosition } from "./timeline.shared"
import TimelineContext from "./timeline.context"
import TimeLineContent from "./timeline-content"

interface UseTimelineItemChildrenOptions {
  position?: TimelinePosition
  icon?: ReactNode
}

function useTimelineItemChildren(
  children: ReactNode,
  options: UseTimelineItemChildrenOptions,
): ReactNode {
  const { position, icon } = options
  const separator: [boolean, ReactNode] = [false, undefined]
  const leftContent: [boolean, ReactNode] = [false, undefined]
  const rightContent: [boolean, ReactNode] = [false, undefined]

  Children.forEach(children, (child) => {
    if (isElementOf(child, TimelineSeparator)) {
      separator[0] = true
      separator[1] = child
    }

    if (leftContent[0] && isElementOf(child, TimelineContent)) {
      rightContent[0] = true
      rightContent[1] = child
    }

    if (!leftContent[0] && isElementOf(child, TimelineContent)) {
      leftContent[0] = true
      leftContent[1] = child
    }
  })

  console.log("11")

  if (!leftContent[0] && !rightContent[0]) {
    leftContent[0] = true
    leftContent[1] = <TimelineContent children={children} />
  }

  if (!separator[0]) {
    separator[0] = true
    separator[1] = (
      <TimelineSeparator>
        <TimelineConnector />
        {icon}
        <TimelineConnector />
      </TimelineSeparator>
    )
  }

  if (position === "left") {
    return (
      <>
        {leftContent[1]}
        {separator[1]}
      </>
    )
  }

  if (position === "right") {
    return (
      <>
        {separator[1]}
        {leftContent[1]}
      </>
    )
  }

  if (!rightContent[0]) {
    rightContent[0] = true
    rightContent[1] = <TimelineContent />
  }

  return (
    <>
      {rightContent[1]}
      {separator[1]}
      {leftContent[1]}
    </>
  )
}

export interface TimeLineItemProps extends PropsWithChildren<ViewProps> {
  position?: TimelinePosition
  icon?: ReactNode
}

function TimelineItem(props: TimeLineItemProps) {
  const {
    className,
    icon = <SettingOutlined size={24} />,
    children: childrenProp,
    ...restProps
  } = props
  const { position } = useContext(TimelineContext)
  const children = useTimelineItemChildren(childrenProp, { position, icon })
  return (
    <TimelineItemBase
      className={classNames(className, {
        [prefixClassname("timeline-item--alternate")]: position === "alternate",
        [prefixClassname("timeline-item--alternate-reverse")]: position === "alternate-reverse",
      })}
      {...restProps}
    >
      {children}
    </TimelineItemBase>
  )
}

export default TimelineItem
