import CellComponent, { CellProps } from "./cell"
import CellGroup from "./cell-group"

interface CellInterface {
  (props: CellProps): JSX.Element

  Group: typeof CellGroup
}

const Cell = CellComponent as CellInterface
Cell.Group = CellGroup

export default Cell
