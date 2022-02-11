import { FunctionComponent } from "react"
import ButtonComponent, { ButtonProps } from "./button"
import ButtonContent from "./button-content"

export * from "./button.shared"
export { createButton } from "./button"
export type { ButtonProps } from "./button"
export { default as ButtonContext } from "./button.context"

interface ButtonInterface extends FunctionComponent<ButtonProps> {
  Content: typeof ButtonContent
}

const Button = ButtonComponent as ButtonInterface

Button.Content = ButtonContent

export default Button
