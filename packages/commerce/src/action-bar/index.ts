import { FunctionComponent } from "react"
import ActionBarComponent, { ActionBarProps } from "./action-bar"
import ActionBarButton from "./action-bar-button"
import ActionBarButtonGroup from "./action-bar-button-group"
import ActionBarIconButton from "./action-bar-icon-button"

interface ActionBarInterface extends FunctionComponent<ActionBarProps> {
  Button: typeof ActionBarButton
  ButtonGroup: typeof ActionBarButtonGroup
  IconButton: typeof ActionBarIconButton
}

const ActionBar = ActionBarComponent as ActionBarInterface

ActionBar.Button = ActionBarButton
ActionBar.ButtonGroup = ActionBarButtonGroup
ActionBar.IconButton = ActionBarIconButton

export default ActionBar
