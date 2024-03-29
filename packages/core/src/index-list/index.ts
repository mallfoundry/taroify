import { default as IndexBarElement, IndexListProps } from "./index-list"
import IndexListAnchor from "./index-list-anchor"

export type { IndexListThemeVars } from './index-list.shared'

interface IndexListInterface {
  (props: IndexListProps): JSX.Element

  Anchor: typeof IndexListAnchor
}

const IndexList = IndexBarElement as IndexListInterface

IndexList.Anchor = IndexListAnchor

export default IndexList
