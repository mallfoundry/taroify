import { createContext, ReactNode } from "react"
import { NumberKeyboardKeyOnPress } from "./number-keyboard-key.shared"

interface NumberKeyboardContextValue {
  title?: ReactNode
  onKeyPress?: NumberKeyboardKeyOnPress
}

const NumberKeyboardContext = createContext<NumberKeyboardContextValue>({})

export default NumberKeyboardContext
