import IndexAnchor from "./index-anchor"
import { default as IndexBarElement, IndexBarProps } from "./index-bar"

interface IndexBarInterface {
  (props: IndexBarProps): JSX.Element

  Anchor: typeof IndexAnchor
}

const IndexBar = IndexBarElement as IndexBarInterface

IndexBar.Anchor = IndexAnchor

export default IndexBar
