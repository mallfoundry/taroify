import * as React from "react"
import { IconProps } from "./shared"
import { VanIcon } from "./van"

export default function ShopOutlined(props: IconProps) {
  const { ...rest } = props
  return (
    <VanIcon children="shop-o" {...rest} />
  )
}
