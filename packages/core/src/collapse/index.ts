import CollapseElement, { type CollapseProps } from "./collapse"
import CollapseItem from "./collapse-item"

export type { CollapseThemeVars } from "./collapse.shared"

interface CollapseInterface {
  (props: CollapseProps): JSX.Element

  Item: typeof CollapseItem
}

const Collapse = CollapseElement as CollapseInterface
Collapse.Item = CollapseItem

export default Collapse
