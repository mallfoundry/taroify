import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useContext,
} from "react"
import { prefixClassname } from "../styles"
import { isElementOf } from "../utils/validate"
import TimelineConnector from "./timeline-connector"
import TimelineContent from "./timeline-content"
import TimelineDot, { TimelineDotProps } from "./timeline-dot"
import TimelineItemBase from "./timeline-item-base"
import TimelineSeparator from "./timeline-separator"
import TimelineContext from "./timeline.context"
import { TimelinePosition } from "./timeline.shared"

interface UseTimelineItemChildrenOptions {
  position?: TimelinePosition
  dot?: ReactNode
}

function useTimelineItemChildren(
  children: ReactNode,
  options: UseTimelineItemChildrenOptions,
): ReactNode {
  const { position, dot } = options
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

  if (!leftContent[0] && !rightContent[0]) {
    leftContent[0] = true
    leftContent[1] = <TimelineContent children={children} />
  }

  if (!separator[0]) {
    separator[0] = true
    separator[1] = (
      <TimelineSeparator>
        {dot}
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
      {leftContent[1]}
      {separator[1]}
      {rightContent[1]}
    </>
  )
}

function useTimelineDot(dot?: ReactNode | TimelineDotProps): ReactNode {
  if (isValidElement(dot)) {
    return dot as ReactElement
  }

  if (_.isObject(dot)) {
    const dotProps = dot as TimelineDotProps
    return <TimelineDot {...dotProps} />
  }
}

export interface TimelineItemProps extends PropsWithChildren<ViewProps> {
  dot?: ReactNode | TimelineDotProps
}

function TimelineItem(props: TimelineItemProps) {
  const { className, dot: dotProp = <TimelineDot />, children: childrenProp, ...restProps } = props
  const { position } = useContext(TimelineContext)
  const dot = useTimelineDot(dotProp)
  const children = useTimelineItemChildren(childrenProp, { position, dot })
  return (
    <TimelineItemBase
      className={classNames(className, {
        [prefixClassname("timeline-item--right")]: position === "right",
        [prefixClassname("timeline-item--left")]: position === "left",
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
