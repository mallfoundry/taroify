import ShareSheetHeader from "../share-sheet/share-sheet-header"
import Sheet from "../sheet"
import ActionSheetComponent, { ActionSheetProps } from "./action-sheet"
import ActionSheetAction from "./action-sheet-action"
import { ActionSheetActionObject } from "./action-sheet.shared"

export type { ActionSheetActionObject } from "./action-sheet.shared"

interface ActionSheetInterface {
  (props: ActionSheetProps): JSX.Element

  Backdrop: typeof Sheet.Backdrop
  Header: typeof ShareSheetHeader
  Action: typeof ActionSheetAction
  Button: typeof Sheet.Button
}

const ActionSheet = ActionSheetComponent as ActionSheetInterface
ActionSheet.Backdrop = Sheet.Backdrop
ActionSheet.Header = ShareSheetHeader
ActionSheet.Action = ActionSheetAction
ActionSheet.Button = Sheet.Button

// eslint-disable-next-line @typescript-eslint/no-redeclare
namespace ActionSheet {
  export type ActionObject = ActionSheetActionObject
}

export default ActionSheet
