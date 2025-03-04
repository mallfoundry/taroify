import Step from "./step"
import StepsComponent, { type StepsProps } from "./steps"

export type { StepsThemeVars } from "./steps.shared"

interface StepsInterface {
  (props: StepsProps): JSX.Element

  Step: typeof Step
}

const Steps = StepsComponent as StepsInterface

Steps.Step = Step

export default Steps
