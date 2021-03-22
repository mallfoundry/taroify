import * as React from "react"
import Icon from "./Icon"
import { NamedIconProps } from "./shared"

export default function ArrowForwardIosOutlined(props: NamedIconProps) {
  const { ...rest } = props
  return (
    <Icon
      theme="outlined"
      children="arrow_forward_ios"
      {...rest}
    />
  )
}
