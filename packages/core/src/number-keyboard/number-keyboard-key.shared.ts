import { isValidElement, ReactElement, ReactNode } from "react"
import NumberKeyboardKey from "./number-keyboard-key"

export type NumberKeyboardKeyCode = "extra" | "backspace" | "keyboard-hide"

export interface NumberKeyboardKeyOnPress {
  (value: string | number, code: NumberKeyboardKeyCode): void
}

export function isNumberKeyboardKeyElement(node: ReactNode): boolean {
  return isValidElement(node) && (node as ReactElement).type === NumberKeyboardKey
}
