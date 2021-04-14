import * as React from "react"
import { IconProps } from "./shared"
import { VantIcon } from "./van"

export default function ShopOutlined(props: IconProps) {
  const { ...rest } = props
  return (
    <VantIcon children="shop-o" {...rest} />
  )
}
