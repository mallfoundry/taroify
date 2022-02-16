import { FunctionComponent } from "react"
import TimelineComponent, { TimeLineProps } from "./timeline"
import TimelineItem from "./timeline-item"

interface AvatarInterface extends FunctionComponent<TimeLineProps> {
  Item: typeof TimelineItem
}

const Timeline = TimelineComponent as AvatarInterface
Timeline.Item = TimelineItem

export default Timeline
