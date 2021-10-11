import { default as DropdownMenuElement, DropdownMenuProps } from "./dropdown-menu"
import DropdownMenuItem from "./dropdown-menu-item"
import DropdownMenuOption from "./dropdown-menu-option"

interface DropdownMenuInterface {
  (props: DropdownMenuProps): JSX.Element

  Item: typeof DropdownMenuItem
  Option: typeof DropdownMenuOption
}

const DropdownMenu = DropdownMenuElement as DropdownMenuInterface

DropdownMenu.Item = DropdownMenuItem
DropdownMenu.Option = DropdownMenuOption

export default DropdownMenu
