import * as React from "react"
import Icon from "./Icon"
import { NamedIconProps } from "./shared"

export default function ImageOutlined(props: NamedIconProps) {
  const { ...rest } = props
  return (
    <Icon theme="outlined" children="image" {...rest} />
  )
}
