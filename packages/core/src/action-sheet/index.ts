import Sheet from "../sheet"
import ActionSheetComponent, { type ActionSheetProps } from "./action-sheet"
import ActionSheetAction from "./action-sheet-action"
import ActionSheetHeader from "./action-sheet-header"
import type { ActionSheetActionObject } from "./action-sheet.shared"

export type { ActionSheetActionObject, ActionSheetThemeVars } from "./action-sheet.shared"

interface ActionSheetInterface {
  (props: ActionSheetProps): JSX.Element

  Backdrop: typeof Sheet.Backdrop
  Header: typeof ActionSheetHeader
  Action: typeof ActionSheetAction
  Button: typeof Sheet.Button
}

const ActionSheet = ActionSheetComponent as ActionSheetInterface
ActionSheet.Backdrop = Sheet.Backdrop
ActionSheet.Header = ActionSheetHeader
ActionSheet.Action = ActionSheetAction
ActionSheet.Button = Sheet.Button

namespace ActionSheet {
  export type ActionObject = ActionSheetActionObject
}

export default ActionSheet
