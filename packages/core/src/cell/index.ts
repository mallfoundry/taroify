import CellElement, { CellProps } from "./cell"
import CellGroup from "./cell-group"

export type { CellAlign, CellSize } from "./cell.shared"
export { default as BaseCell } from "./base-cell"

interface CellInterface {
  (props: CellProps): JSX.Element

  Group: typeof CellGroup
}

const Cell = CellElement as CellInterface
Cell.Group = CellGroup

export default Cell
