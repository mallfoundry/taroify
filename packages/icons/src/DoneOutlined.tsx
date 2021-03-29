import * as React from "react"
import Icon from "./Icon"
import { NamedIconProps } from "./shared"

export default function DoneOutlined(props: NamedIconProps) {
  const { ...rest } = props
  return (
    <Icon theme="outlined" children="done" {...rest} />
  )
}
