import ListComponent from "./list"
import ListPlaceholder from "./list-placeholder"

export type { ListDirection, ListThemeVars } from "./list.shared"

type ListType = (typeof ListComponent) & {
  Placeholder: typeof ListPlaceholder
}

const List = ListComponent as ListType

List.Placeholder = ListPlaceholder

export default List
export type { ListInstance } from "./list.shared"
