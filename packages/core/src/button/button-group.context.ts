import { createContext } from "react"
import { ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from "./button.shared"

interface ButtonGroupContextValue {
  variant?: ButtonVariant
  shape?: ButtonShape
  size?: ButtonSize
  color?: ButtonColor
  hairline?: boolean
  disabled?: boolean
}

const ButtonGroupContext = createContext<ButtonGroupContextValue>({})

export default ButtonGroupContext
