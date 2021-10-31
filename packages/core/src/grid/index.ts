import GridComponent, { GridProps } from "./grid"
import GridItem from "./grid-item"

interface GridInterface {
  (props: GridProps): JSX.Element

  Item: typeof GridItem
}

const Grid = GridComponent as GridInterface
Grid.Item = GridItem

export default Grid
