import { createContext } from "react"
import type { PopupPlacement } from "./popup.shared"

interface PopupContextProps {
  open?: boolean
  duration?: number
  placement?: PopupPlacement

  onClose?(opened: boolean): void
}

const PopupContext = createContext<PopupContextProps>({})
export default PopupContext
