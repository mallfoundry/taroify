import { ForwardRefExoticComponent } from "react"
import FloatingPanelComponent, { FloatingPanelProps } from "./floating-panel"

interface PopupInterface extends ForwardRefExoticComponent<FloatingPanelProps> {
  (props: FloatingPanelProps): JSX.Element
}

const FloatingPanel = FloatingPanelComponent as PopupInterface

export default FloatingPanel
