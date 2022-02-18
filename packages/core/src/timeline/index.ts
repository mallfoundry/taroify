import { FunctionComponent } from "react"
import TimelineComponent, { TimeLineProps } from "./timeline"
import TimelineItem from "./timeline-item"
import TimelineContent from "./timeline-content"
import TimelineSeparator from "./timeline-separator"
interface TimelineInterface extends FunctionComponent<TimeLineProps> {
  Item: typeof TimelineItem
  Content: typeof TimelineContent
  Separator: typeof TimelineSeparator
}

const Timeline = TimelineComponent as TimelineInterface
Timeline.Item = TimelineItem
Timeline.Content = TimelineContent
Timeline.Separator = TimelineSeparator

export default Timeline
