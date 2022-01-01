import { default as StepperComponent, StepperProps } from "./stepper"
import StepperButton from "./stepper-button"
import StepperInput from "./stepper-input"

export type { StepperProps } from "./stepper"

interface StepperInterface {
  (props: StepperProps): JSX.Element

  Input: typeof StepperInput
  Button: typeof StepperButton
}

const Stepper = StepperComponent as StepperInterface

Stepper.Input = StepperInput
Stepper.Button = StepperButton

export default Stepper
