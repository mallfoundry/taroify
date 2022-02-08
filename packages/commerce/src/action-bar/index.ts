import ActionBarElement from "./action-bar"
import ActionBarButton from "./action-bar-button"
import ActionBarButtonGroup from "./action-bar-button-group"
import ActionBarIconButton from "./action-bar-icon-button"

interface ActionBarInterface {
  (props: any): JSX.Element

  IconButton: typeof ActionBarIconButton
  Button: typeof ActionBarButton
  ButtonGroup: typeof ActionBarButtonGroup
}

const ActionBar = ActionBarElement as unknown as ActionBarInterface

ActionBar.IconButton = ActionBarIconButton
ActionBar.Button = ActionBarButton
ActionBar.ButtonGroup = ActionBarButtonGroup

export default ActionBar
