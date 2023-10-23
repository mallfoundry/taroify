import NoticeBarElement from "./notice-bar"
import { NoticeBarAction } from "./notice-bar-action"
import { NoticeBarIcon } from "./notice-bar-icon"

export type { NoticeBarThemeVars, NoticeBarInterface } from "./notice-bar.shared"

type NoticeBarComponent = typeof NoticeBarElement & {
  Icon: typeof NoticeBarIcon
  Action: typeof NoticeBarAction
}

const NoticeBar = NoticeBarElement as NoticeBarComponent

NoticeBar.Icon = NoticeBarIcon
NoticeBar.Action = NoticeBarAction

export default NoticeBar
