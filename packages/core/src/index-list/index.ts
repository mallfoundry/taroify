import { default as IndexBarElement, IndexBarProps } from "./index-list"
import IndexListAnchor from "./index-list-anchor"

interface IndexListInterface {
  (props: IndexBarProps): JSX.Element

  Anchor: typeof IndexListAnchor
}

const IndexList = IndexBarElement as IndexListInterface

IndexList.Anchor = IndexListAnchor

export default IndexList
