import TreeSelectElement, { type TreeSelectProps } from "./tree-select"
import TreeSelectOption from "./tree-select-option"
import TreeSelectTab from "./tree-select-tab"
import type { TreeSelectTabObject } from "./tree-select.shared"

export type { TreeSelectThemeVars } from "./tree-select.shared"

interface TreeSelectInterface {
  (props: TreeSelectProps): JSX.Element

  Tab: typeof TreeSelectTab
  Option: typeof TreeSelectOption
}

const TreeSelect = TreeSelectElement as TreeSelectInterface

TreeSelect.Tab = TreeSelectTab
TreeSelect.Option = TreeSelectOption

namespace TreeSelect {
  export type TabObject = TreeSelectTabObject
}

export default TreeSelect
