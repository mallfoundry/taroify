import { ForwardRefExoticComponent } from "react"
import { default as IndexBarElement, IndexListProps } from "./index-list"
import IndexListAnchor from "./index-list-anchor"

export type { IndexListThemeVars } from "./index-list.shared"

interface IndexListInterface extends ForwardRefExoticComponent<IndexListProps> {
  (props: IndexListProps): React.ReactElement

  Anchor: typeof IndexListAnchor
}

const IndexList = IndexBarElement as IndexListInterface

IndexList.Anchor = IndexListAnchor

export default IndexList
