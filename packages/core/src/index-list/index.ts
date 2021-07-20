import IndexAnchor from "./index-anchor"
import { default as IndexBarElement, IndexBarProps } from "./index-list"

interface IndexListInterface {
  (props: IndexBarProps): JSX.Element

  Anchor: typeof IndexAnchor
}

const IndexList = IndexBarElement as IndexListInterface

IndexList.Anchor = IndexAnchor

export default IndexList
