import { ForwardRefExoticComponent } from "react"
import FlexComponent, { FlexProps } from "./flex"
import FlexItem from "./flex-item"

export type { FlexProps } from "./flex"
export type { FlexItemProps } from "./flex-item"

interface FlexInterface extends ForwardRefExoticComponent<FlexProps> {
  Item: typeof FlexItem
}

const Flex = FlexComponent as FlexInterface

Flex.Item = FlexItem

export default Flex
