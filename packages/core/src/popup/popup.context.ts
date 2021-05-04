import { createContext } from "react"
import { PopupPlacement, PopupPlacementString } from "./shared"

interface PopupContextProps {
  open?: boolean
  placement?: PopupPlacement | PopupPlacementString
  emitClose?: (opened: boolean) => void
}

const PopupContext = createContext<PopupContextProps>({})
export default PopupContext
