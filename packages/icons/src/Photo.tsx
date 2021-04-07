import * as React from "react"
import { IconProps } from "./shared"
import { VantIcon } from "./vant"

export default function Photo(props: IconProps) {
  const { ...rest } = props
  return (
    <VantIcon children="photo" {...rest} />
  )
}
