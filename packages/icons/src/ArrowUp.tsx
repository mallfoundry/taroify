import * as React from "react"
import { IconProps } from "./shared"
import { VanIcon } from "./van"

export default function ArrowUp(props: IconProps) {
  const { ...rest } = props
  return (
    <VanIcon children="arrow-up" {...rest} />
  )
}
