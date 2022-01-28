import ActionBarElement from "./action-bar"
import ActionBarButton from "./action-bar-button"
import ActionBarIconButton from "./action-bar-icon-button"

interface ActionBarInterface {
  (props: any): JSX.Element

  IconButton: typeof ActionBarIconButton
  Button: typeof ActionBarButton
}

const ActionBar = ActionBarElement as unknown as ActionBarInterface

ActionBar.IconButton = ActionBarIconButton
ActionBar.Button = ActionBarButton

export default ActionBar
