import CollapseElement, { CollapseProps } from "./collapse"
import CollapseItem from "./collapse-item"

interface CollapseInterface {
  (props: CollapseProps): JSX.Element

  Item: typeof CollapseItem
}

const Collapse = CollapseElement as CollapseInterface
Collapse.Item = CollapseItem

export default Collapse
