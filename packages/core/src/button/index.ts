import { FunctionComponent } from "react"
import ButtonComponent, { ButtonProps } from "./button"
import ButtonContent from "./button-content"
import ButtonGroup from "./button-group"

export * from "./button.shared"
export { createButton } from "./button"
export type { ButtonProps } from "./button"
export { default as ButtonContext } from "./button.context"

interface ButtonInterface extends FunctionComponent<ButtonProps> {
  Content: typeof ButtonContent
  Group: typeof ButtonGroup
}

const Button = ButtonComponent as ButtonInterface

Button.Content = ButtonContent
Button.Group = ButtonGroup

export default Button
