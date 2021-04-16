import * as React from "react"
import { IconProps } from "./shared"
import { VanIcon } from "./van"

export default function LocationOutlined(props: IconProps) {
  const { ...rest } = props
  return <VanIcon children="location-o" {...rest} />
}
