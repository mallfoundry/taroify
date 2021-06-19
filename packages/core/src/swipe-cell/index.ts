import SwipeCellElement, { SwipeCellProps } from "./swipe-cell"
import SwipeCellActions from "./swipe-cell-actions"

interface SwipeCellInterface {
  (props: SwipeCellProps): JSX.Element

  Actions: typeof SwipeCellActions
}

const SwipeCell = SwipeCellElement as SwipeCellInterface

SwipeCell.Actions = SwipeCellActions

export default SwipeCell
