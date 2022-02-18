import { FunctionComponent } from "react"
import TimelineComponent, { TimeLineProps } from "./timeline"
import TimelineItem from "./timeline-item"
import TimelineContent from "./timeline-content"
import TimelineSeparator from "./timeline-separator"
import TimelineConnector from "./timeline-connector"

interface TimelineInterface extends FunctionComponent<TimeLineProps> {
  Item: typeof TimelineItem
  Content: typeof TimelineContent
  Separator: typeof TimelineSeparator
  Connector: typeof TimelineConnector
}

const Timeline = TimelineComponent as TimelineInterface
Timeline.Item = TimelineItem
Timeline.Content = TimelineContent
Timeline.Separator = TimelineSeparator
Timeline.Connector = TimelineConnector

export default Timeline
