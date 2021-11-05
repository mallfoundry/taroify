import DialogComponent, { DialogProps } from "./dialog"
import DialogActions from "./dialog-actions"
import DialogContent from "./dialog-content"
import DialogHeader from "./dialog-header"
import {
  alertDialog,
  cancelDialog,
  confirmDialog,
  openDialog,
  resetDefaultDialogOptions,
  setDefaultDialogOptions,
} from "./dialog.imperative"

interface DialogInterface {
  (props: DialogProps): JSX.Element

  Header: typeof DialogHeader
  Content: typeof DialogContent
  Actions: typeof DialogActions

  alert: typeof alertDialog
  confirm: typeof confirmDialog
  open: typeof openDialog
  cancel: typeof cancelDialog

  setDefaultOptions: typeof setDefaultDialogOptions

  resetDefaultOptions: typeof resetDefaultDialogOptions
}

const Dialog = DialogComponent as DialogInterface
Dialog.Header = DialogHeader
Dialog.Content = DialogContent
Dialog.Actions = DialogActions

Dialog.confirm = confirmDialog
Dialog.alert = alertDialog
Dialog.open = openDialog
Dialog.cancel = cancelDialog

Dialog.setDefaultOptions = setDefaultDialogOptions
Dialog.resetDefaultOptions = resetDefaultDialogOptions

export default Dialog
