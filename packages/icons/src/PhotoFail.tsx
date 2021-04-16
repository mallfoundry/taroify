import * as React from "react"
import { IconProps } from "./shared"
import { VanIcon } from "./van"

export default function PhotoFail(props: IconProps) {
  const { ...rest } = props
  return <VanIcon children="photo-fail" {...rest} />
}
