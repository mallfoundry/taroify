import ListComponent, { ListProps } from "./list"
import ListPlaceholder from "./list-placeholder"

export type { ListDirection } from "./list.shared"

interface ListInterface {
  (props: ListProps): JSX.Element

  Placeholder: typeof ListPlaceholder
}

const List = ListComponent as ListInterface

List.Placeholder = ListPlaceholder

export default List
