import { ReactNode } from "react"
import NotifyComponent, { NotifyProps } from "./notify"
import { NotifyOptions, openNotify } from "./notify.imperative"

export type { NotifyColor } from "./notify.shared"

interface NotifyInterface {
  (props: NotifyProps): JSX.Element

  open(option: ReactNode | NotifyOptions): void
}

const Notify = NotifyComponent as NotifyInterface
Notify.open = openNotify

export default Notify
