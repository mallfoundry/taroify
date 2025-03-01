import { default as DropdownMenuElement, type DropdownMenuProps } from "./dropdown-menu"
import DropdownMenuItem from "./dropdown-menu-item"
import DropdownMenuOption from "./dropdown-menu-option"

export type { DropdownMenuThemeVars } from "./dropdown-menu.shared"

interface DropdownMenuInterface {
  (props: DropdownMenuProps): JSX.Element

  Item: typeof DropdownMenuItem
  Option: typeof DropdownMenuOption
}

const DropdownMenu = DropdownMenuElement as DropdownMenuInterface

DropdownMenu.Item = DropdownMenuItem
DropdownMenu.Option = DropdownMenuOption

export default DropdownMenu
