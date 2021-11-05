import NotifyComponent, { NotifyProps } from "./notify"
import {
  closeNotify,
  openNotify,
  resetDefaultNotifyOptions,
  setDefaultNotifyOptions,
} from "./notify.imperative"

export type { NotifyColor } from "./notify.shared"

interface NotifyInterface {
  (props: NotifyProps): JSX.Element

  open: typeof openNotify

  close: typeof closeNotify

  setDefaultOptions: typeof setDefaultNotifyOptions

  resetDefaultOptions: typeof resetDefaultNotifyOptions
}

const Notify = NotifyComponent as NotifyInterface
Notify.open = openNotify
Notify.close = closeNotify
Notify.setDefaultOptions = setDefaultNotifyOptions
Notify.resetDefaultOptions = resetDefaultNotifyOptions

export default Notify
