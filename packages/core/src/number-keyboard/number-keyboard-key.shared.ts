import { isValidElement, ReactElement, ReactNode } from "react"
import NumberKeyboardKey from "./number-keyboard-key"

export enum NumberKeyboardKeyCode {
  Extra = "extra",
  Backspace = "backspace",
  KeyboardHide = "keyboard-hide",
}

export type NumberKeyboardKeyCodeString = "extra" | "backspace" | "keyboard-hide"

export interface NumberKeyboardKeyOnPress {
  (value: string | number, code: NumberKeyboardKeyCode | NumberKeyboardKeyCodeString): void
}

export function isNumberKeyboardKeyElement(node: ReactNode): boolean {
  return isValidElement(node) && (node as ReactElement).type === NumberKeyboardKey
}
