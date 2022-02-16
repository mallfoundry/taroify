import { FunctionComponent } from "react"
import TimeLineComponent, { TimeLineProps } from "./time-line"
import TimeLineItem from "./time-line-item"

interface AvatarInterface extends FunctionComponent<TimeLineProps> {
  Item: typeof TimeLineItem
}

const TimeLine = TimeLineComponent as AvatarInterface
TimeLine.Item = TimeLineItem

export default TimeLine
