import NoticeBarElement, { NoticeBarProps } from "./notice-bar"
import { NoticeBarAction } from "./notice-bar-action"
import { NoticeBarIcon } from "./notice-bar-icon"

interface NoticeBarInterface {
  (props: NoticeBarProps): JSX.Element

  Icon: typeof NoticeBarIcon
  Action: typeof NoticeBarAction
}

const NoticeBar = NoticeBarElement as NoticeBarInterface

NoticeBar.Icon = NoticeBarIcon
NoticeBar.Action = NoticeBarAction

export default NoticeBar
