import * as React from "react"
import { IconProps } from "./shared"
import { VanIcon } from "./van"

export default function Photo(props: IconProps) {
  const { ...rest } = props
  return <VanIcon children="photo" {...rest} />
}
