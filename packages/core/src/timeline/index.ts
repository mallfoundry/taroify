import type { FunctionComponent } from "react"
import TimelineComponent, { type TimelineProps } from "./timeline"
import TimelineConnector from "./timeline-connector"
import TimelineContent from "./timeline-content"
import TimelineDot from "./timeline-dot"
import TimelineItem from "./timeline-item"
import TimelineSeparator from "./timeline-separator"

export type { TimelineThemeVars } from "./timeline.shared"

interface TimelineInterface extends FunctionComponent<TimelineProps> {
  Connector: typeof TimelineConnector
  Content: typeof TimelineContent
  Dot: typeof TimelineDot
  Item: typeof TimelineItem
  Separator: typeof TimelineSeparator
}

const Timeline = TimelineComponent as TimelineInterface
Timeline.Connector = TimelineConnector
Timeline.Content = TimelineContent
Timeline.Dot = TimelineDot
Timeline.Item = TimelineItem
Timeline.Separator = TimelineSeparator

export default Timeline
