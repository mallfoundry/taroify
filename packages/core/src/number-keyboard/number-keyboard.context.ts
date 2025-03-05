import { createContext, type ReactNode } from "react"
import type { NumberKeyboardKeyOnPress } from "./number-keyboard-key.shared"

interface NumberKeyboardContextValue {
  title?: ReactNode
  onKeyPress?: NumberKeyboardKeyOnPress
}

const NumberKeyboardContext = createContext<NumberKeyboardContextValue>({})

export default NumberKeyboardContext
