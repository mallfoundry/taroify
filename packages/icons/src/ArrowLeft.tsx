import * as React from "react"
import { IconProps } from "./shared"
import { VanIcon } from "./van"

export default function ArrowLeft(props: IconProps) {
  const { ...rest } = props
  return <VanIcon children="arrow-left" {...rest} />
}
