import ActionBarElement from "./action-bar"
import ActionBarButton from "./action-bar-button"
import ActionBarIcon from "./action-bar-icon"

interface ActionBarInterface {
  (props: any): JSX.Element

  Icon: typeof ActionBarIcon
  Button: typeof ActionBarButton
}

const ActionBar = ActionBarElement as unknown as ActionBarInterface

ActionBar.Icon = ActionBarIcon
ActionBar.Button = ActionBarButton

export default ActionBar
