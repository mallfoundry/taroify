import { default as PopoverComponent, PopoverProps } from "./popover"
import PopoverTrigger from "./popover-trigger"

interface PopoverInterface {
  (props: PopoverProps): JSX.Element

  Trigger: typeof PopoverTrigger
}

const Popover = PopoverComponent as PopoverInterface

Popover.Trigger = PopoverTrigger

// eslint-disable-next-line @typescript-eslint/no-redeclare
namespace Popover {
  // export type Key = DropdownMenuKey
  // export type Value = DropdownMenuValue | DropdownMenuValues
}

export default Popover
