import { FunctionComponent } from "react"
import PasswordInputComponent, { PasswordInputProps } from "./password-input"
import PasswordInputFeedback from "./password-input-feedback"

export type { PasswordInputThemeVars } from './password-input.shared'

interface PasswordInputInterface extends FunctionComponent<PasswordInputProps> {
  (props: PasswordInputProps): JSX.Element

  Feedback: typeof PasswordInputFeedback
}

const PasswordInput = PasswordInputComponent as PasswordInputInterface

PasswordInput.Feedback = PasswordInputFeedback

export default PasswordInput
