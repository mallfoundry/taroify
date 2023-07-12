import GridComponent, { GridProps } from "./grid"
import GridItem from "./grid-item"

export type { GridThemeVars } from './grid.shared'

interface GridInterface {
  (props: GridProps): JSX.Element

  Item: typeof GridItem
}

const Grid = GridComponent as GridInterface
Grid.Item = GridItem

export default Grid
