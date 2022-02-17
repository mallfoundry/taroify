import { FunctionComponent } from "react"
import TimelineComponent, { TimeLineProps } from "./timeline"
import TimelineItem from "./timeline-item"
import TimelineContent from "./timeline-content"
interface TimelineInterface extends FunctionComponent<TimeLineProps> {
  Item: typeof TimelineItem
  Content:typeof TimelineContent
}

const Timeline = TimelineComponent as TimelineInterface
Timeline.Item = TimelineItem
Timeline.Content = TimelineContent

export default Timeline
