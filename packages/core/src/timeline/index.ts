import { FunctionComponent } from "react"
import TimelineComponent, { TimeLineProps } from "./timeline"
import TimelineItem from "./timeline-item"
import TimelineContent from "./timeline-content"
import TimelineLine from "./timeline-line"
interface TimelineInterface extends FunctionComponent<TimeLineProps> {
  Item: typeof TimelineItem
  Content: typeof TimelineContent
  Line: typeof TimelineLine
}

const Timeline = TimelineComponent as TimelineInterface
Timeline.Item = TimelineItem
Timeline.Content = TimelineContent
Timeline.Line = TimelineLine

export default Timeline
