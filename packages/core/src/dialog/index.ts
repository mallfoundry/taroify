import DialogComponent, { DialogProps } from "./dialog"
import DialogActions from "./dialog-actions"
import DialogContent from "./dialog-content"
import DialogHeader from "./dialog-header"

interface DialogInterface {
  (props: DialogProps): JSX.Element

  Header: typeof DialogHeader
  Content: typeof DialogContent
  Actions: typeof DialogActions
}

const Dialog = DialogComponent as DialogInterface
Dialog.Header = DialogHeader
Dialog.Content = DialogContent
Dialog.Actions = DialogActions

export default Dialog
