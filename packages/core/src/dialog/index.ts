import DialogComponent, { DialogProps } from "./dialog"
import DialogActions from "./dialog-actions"
import DialogContent from "./dialog-content"
import DialogHeader from "./dialog-header"
import { alertDialog, confirmDialog, openDialog } from "./dialog.imperative"

interface DialogInterface {
  (props: DialogProps): JSX.Element

  Header: typeof DialogHeader
  Content: typeof DialogContent
  Actions: typeof DialogActions

  alert: typeof alertDialog
  confirm: typeof confirmDialog
  open: typeof openDialog
}

const Dialog = DialogComponent as DialogInterface
Dialog.Header = DialogHeader
Dialog.Content = DialogContent
Dialog.Actions = DialogActions

Dialog.confirm = confirmDialog
Dialog.alert = alertDialog
Dialog.open = openDialog

export default Dialog
