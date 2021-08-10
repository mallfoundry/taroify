import NumberKeyboardElement, { NumberKeyboardProps } from "./number-keyboard"
import NumberKeyboardButton from "./number-keyboard-button"
import NumberKeyboardHeader from "./number-keyboard-header"
import NumberKeyboardKey from "./number-keyboard-key"
import { NumberKeyboardKeyCode, NumberKeyboardKeyCodeString } from "./number-keyboard-key.shared"
import NumberKeyboardSidebar from "./number-keyboard-sidebar"

interface NumberKeyboardInterface {
  (props: NumberKeyboardProps): JSX.Element

  KeyCode: typeof NumberKeyboardKeyCode
  Key: typeof NumberKeyboardKey
  Button: typeof NumberKeyboardButton
  Header: typeof NumberKeyboardHeader
  Sidebar: typeof NumberKeyboardSidebar
}

const NumberKeyboard = NumberKeyboardElement as NumberKeyboardInterface

NumberKeyboard.KeyCode = NumberKeyboardKeyCode
NumberKeyboard.Key = NumberKeyboardKey
NumberKeyboard.Button = NumberKeyboardButton
NumberKeyboard.Header = NumberKeyboardHeader
NumberKeyboard.Sidebar = NumberKeyboardSidebar

// eslint-disable-next-line @typescript-eslint/no-redeclare
namespace NumberKeyboard {
  export type KeyCode = NumberKeyboardKeyCode | NumberKeyboardKeyCodeString
}

export default NumberKeyboard
