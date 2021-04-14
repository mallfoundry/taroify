import * as React from "react"
import { IconProps } from "./shared"
import { VantIcon } from "./van"

export default function ArrowUp(props: IconProps) {
  const { ...rest } = props
  return (
    <VantIcon children="arrow-up" {...rest} />
  )
}
