import * as React from "react"
import Icon from "./Icon"
import { NamedIconProps } from "./shared"

export default function BrokenImageOutlined(props: NamedIconProps) {
  const { ...rest } = props
  return (
    <Icon theme="outlined" children="broken_image" {...rest} />
  )
}
