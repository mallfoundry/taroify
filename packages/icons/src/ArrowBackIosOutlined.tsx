import * as React from "react"
import Icon from "./Icon"
import { NamedIconProps } from "./shared"

export default function ArrowBackIosOutlined(props: NamedIconProps) {
  const { ...rest } = props
  return (
    <Icon
      theme="outlined"
      children="arrow_back_ios"
      {...rest}
    />
  )
}
