import * as React from "react"
import Icon from "./Icon"
import { NamedIconProps } from "./shared"

export default function PriorityHighOutlined(props: NamedIconProps) {
  const { ...rest } = props
  return (
    <Icon theme="outlined" children="priority_high" {...rest} />
  )
}
