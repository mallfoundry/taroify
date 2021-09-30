import { createContext } from "react"
import { PopupPlacement, PopupPlacementString } from "./popup.shared"

interface PopupContextProps {
  open?: boolean
  placement?: PopupPlacement | PopupPlacementString
  onClose?: (opened: boolean) => void
}

const PopupContext = createContext<PopupContextProps>({})
export default PopupContext
