import { default as ListElement, ListProps } from "./list"
import ListPlaceholder from "./list-placeholder"

interface ListInterface {
  (props: ListProps): JSX.Element

  Placeholder: typeof ListPlaceholder
}

const List = ListElement as ListInterface

List.Placeholder = ListPlaceholder

export default List
