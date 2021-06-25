import { default as DropdownMenuComponent, DropdownMenuProps } from "./dropdown-menu"
import DropdownMenuItem from "./dropdown-menu-item"
import DropdownMenuOption from "./dropdown-menu-option"
import { DropdownMenuKey, DropdownMenuValue, DropdownMenuValues } from "./dropdown-menu.shared"

interface DropdownMenuInterface {
  (props: DropdownMenuProps): JSX.Element

  Item: typeof DropdownMenuItem
  Option: typeof DropdownMenuOption
}

const DropdownMenu = DropdownMenuComponent as DropdownMenuInterface

DropdownMenu.Item = DropdownMenuItem
DropdownMenu.Option = DropdownMenuOption

// eslint-disable-next-line @typescript-eslint/no-redeclare
namespace DropdownMenu {
  export type Key = DropdownMenuKey
  export type Value = DropdownMenuValue | DropdownMenuValues
}

export default DropdownMenu
